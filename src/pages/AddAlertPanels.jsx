import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import socket from "../Shared/socket";
import { AuthContext } from "../providers/AuthProvider";
import AccessDenialMessage from "../Shared/SecuredMessage/AccessDenialMessage";

const AddAlertPanels = () => {
  const [alerts, setAlerts] = useState([]);
  const [offlineAlerts, setOfflineAlerts] = useState([]);
  const { user } = useContext(AuthContext);

  const SERVER_URL = "http://localhost:5000/alertPanel";

  // 🔹 Load offline alerts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("offlineAlerts")) || [];
    setOfflineAlerts(saved);
  }, []);

  // 🔹 Save alert locally when offline
  const saveOfflineAlert = (alert) => {
    const existing = JSON.parse(localStorage.getItem("offlineAlerts")) || [];
    const updated = [...existing, alert];
    localStorage.setItem("offlineAlerts", JSON.stringify(updated));
    setOfflineAlerts(updated);
  };

  // 🔹 Delete all pending alerts manually
  const handleDeletePending = () => {
    localStorage.removeItem("offlineAlerts");
    setOfflineAlerts([]);
    Swal.fire("Deleted", "All pending offline alerts have been removed.", "info");
  };

  // 🔹 Sync offline alerts (manual or auto)
  const syncOfflineAlerts = async () => {
    const offlineAlertsLocal = JSON.parse(localStorage.getItem("offlineAlerts")) || [];
    if (offlineAlertsLocal.length === 0) {
      Swal.fire("No Pending Alerts", "There are no offline alerts to sync.", "info");
      return;
    }

    let remainingAlerts = [];

    Swal.fire({
      title: "Syncing...",
      text: "Please wait while we sync your offline alerts.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    for (const alert of offlineAlertsLocal) {
      try {
        const res = await fetch(SERVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alert),
        });

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        data.status = alert.status === "Pending" ? "Active" : alert.status;
        data.syncStatus = "Synced";
        data.networkStatus = "Online";

        socket.emit("newAlert", data);
      } catch (err) {
        console.error("❌ Failed to sync alert:", err);
        remainingAlerts.push(alert);
      }
    }

    Swal.close();

    if (remainingAlerts.length === 0) {
      localStorage.removeItem("offlineAlerts");
      setOfflineAlerts([]);
      Swal.fire("✅ Synced", "All offline alerts synced successfully!", "success");
    } else {
      localStorage.setItem("offlineAlerts", JSON.stringify(remainingAlerts));
      setOfflineAlerts(remainingAlerts);
      Swal.fire(
        "⚠️ Partial Sync",
        `${remainingAlerts.length} alert(s) failed to sync. They will retry automatically.`,
        "warning"
      );
    }
  };

  // 🔹 Listen for socket updates & network reconnect
  useEffect(() => {
    socket.on("newAlert", (newAlert) => {
      setAlerts((prev) => {
        if (prev.some((a) => a._id === newAlert._id)) return prev;
        return [newAlert, ...prev];
      });
    });

    const handleOnline = () => {
      console.log("🌐 Network reconnected — attempting to sync...");
      syncOfflineAlerts();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      socket.off("newAlert");
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // 🔹 Submit new alert
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newAlert = {
      headline: form.headline.value,
      type: form.type.value,
      description: form.description.value,
      location: form.location.value,
      severity: form.severity.value,
      timestamp: new Date(form.timestamp.value).toISOString(),
      year: parseInt(form.year.value),
      details: form.details.value,
      image: form.image.value,
      affectedPopulation: parseInt(form.affectedPopulation.value),
      requiredResources: form.requiredResources.value,
      donationNeeded: form.donationNeeded.checked,
      donationGoal: form.donationGoal.value ? parseInt(form.donationGoal.value) : 0,
      donationReceived: 0,
      donationCategory: form.donationCategory.value || "general",
      submittedBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
      status: form.status.value || "Pending",
      syncStatus: navigator.onLine ? "Synced" : "Offline",
      networkStatus: navigator.onLine ? "Online" : "Offline",
    };

    if (!navigator.onLine) {
      saveOfflineAlert(newAlert);
      Swal.fire(
        "Offline Mode",
        "You are offline. This alert will be synced automatically when you're back online.",
        "info"
      );
      form.reset();
      return;
    }

    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlert),
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit("newAlert", data);
        Swal.fire("Success", "Alert added successfully!", "success");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };
if (!user) {
  return <AccessDenialMessage/>; 
}
  return (
    <div className="max-w-5xl mx-auto pb-20 pt-16 px-10">
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl tracking-widest text-center text-gray-800 font-anton dark:text-white mb-10">
          Add New Alert Panel
        </h2>

        {/* 🔹 Pending Offline Alerts Display */}
        {offlineAlerts.length > 0 && (
          <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md border border-yellow-400">
            <h3 className="font-semibold mb-2 dark:text-yellow-200">Pending Offline Alerts</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm dark:text-yellow-100">
              {offlineAlerts.map((alert, index) => (
                <li key={index}>
                  <strong>{alert.headline}</strong> ({alert.type}) - {alert.location}  
                  | Status: {alert.status} ({alert.syncStatus})
                </li>
              ))}
            </ul>

            {/* 🔹 Buttons for actions */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={syncOfflineAlerts}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md"
              >
                Sync Now
              </button>
              <button
                onClick={handleDeletePending}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
              >
                Delete All Pending
              </button>
            </div>
          </div>
        )}

        {/* 🔹 Alert Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          {[
            { label: "Headline", name: "headline", type: "text" },
            { label: "Type", name: "type", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Timestamp", name: "timestamp", type: "date" },
            { label: "Year", name: "year", type: "number" },
            { label: "Image URL", name: "image", type: "text" },
            { label: "Number of People Affected", name: "affectedPopulation", type: "number" },
            { label: "Required Resources", name: "requiredResources", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                required
                className="w-full bg-white dark:bg-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* 🔹 Severity */}
          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">Severity</label>
            <select
              name="severity"
              required
              className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Severity --</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* 🔹 Donation Settings */}
          <div className="pt-5 pb-10 border-y-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Donation Settings</h3>

            <div className="flex items-center gap-2 mb-3">
              <input type="checkbox" name="donationNeeded" id="donationNeeded" />
              <label htmlFor="donationNeeded" className="dark:text-white">Enable Donations</label>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">Donation Goal (BDT)</label>
              <input type="number" name="donationGoal" className="w-full border dark:bg-black bg-white rounded-md px-3 py-2" />
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium dark:text-white mb-1">Donation Category</label>
              <select name="donationCategory" className="w-full border dark:bg-black bg-white rounded-md px-3 py-2">
                <option value="general">General Relief</option>
                <option value="food">Food & Water</option>
                <option value="shelter">Shelter</option>
                <option value="medical">Medical</option>
              </select>
            </div>
          </div>

          {/* 🔹 Details & Description */}
          <div>
            <label className="block mt-5 text-sm font-medium dark:text-white mb-1">Details</label>
            <textarea name="details" required rows={3} className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">Description</label>
            <textarea name="description" required rows={2} className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>

          {/* 🔹 Status */}
          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">Status</label>
            <select name="status" required className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Select Status --</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button type="submit" className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 dark:hover:from-purple-700 dark:hover:to-indigo-600 transition-all duration-300">
            Add Alert
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAlertPanels;
