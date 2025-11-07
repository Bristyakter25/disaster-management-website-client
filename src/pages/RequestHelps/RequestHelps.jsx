import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import RequestHelpsMap from "./RequestHelpsMap";
import AccessDenialMessage from "../../Shared/SecuredMessage/AccessDenialMessage";
import socket from "../../Shared/socket";

const RequestHelps = () => {
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [offlineRequests, setOfflineRequests] = useState([]);

  const SERVER_URL = "https://disaster-management-website-server.onrender.com/requestHelps";

  // 🔹 Load offline requests at startup
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    setOfflineRequests(saved);
  }, []);

  // 🔹 Save request locally when offline
  const saveOfflineRequest = (request) => {
    const existing = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    const updated = [...existing, request];
    localStorage.setItem("offlineRequests", JSON.stringify(updated));
    setOfflineRequests(updated);
  };

  // 🔹 Delete all pending offline requests
  const clearOfflineRequests = () => {
    localStorage.removeItem("offlineRequests");
    setOfflineRequests([]);
    Swal.fire("Deleted", "All pending offline requests have been removed.", "info");
  };

  // 🔹 Sync offline requests
  const syncOfflineRequests = async () => {
    const offlineRequestsLocal = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    if (offlineRequestsLocal.length === 0) return;

    let remaining = [];

    Swal.fire({
      title: "Syncing...",
      text: "Please wait while we sync your offline requests.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    for (const req of offlineRequestsLocal) {
      try {
        const res = await fetch(SERVER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        socket.emit("newRequestHelp", data);
      } catch (err) {
        console.error("Failed to sync request:", err);
        remaining.push(req);
      }
    }

    Swal.close();

    if (remaining.length === 0) {
      localStorage.removeItem("offlineRequests");
      setOfflineRequests([]);
      Swal.fire("✅ Synced", "All offline requests synced successfully!", "success");
    } else {
      localStorage.setItem("offlineRequests", JSON.stringify(remaining));
      setOfflineRequests(remaining);
      Swal.fire(
        "⚠️ Partial Sync",
        `${remaining.length} request(s) failed to sync. They will retry automatically.`,
        "warning"
      );
    }
  };

  // 🔹 Listen for network reconnect
  useEffect(() => {
    const handleOnline = () => {
      console.log("Network reconnected — syncing offline requests...");
      syncOfflineRequests();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  // 🔹 Fetch disaster alerts
  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Error loading alerts:", err));
  }, []);

  // 🔹 Submit new request
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectedAlert = alerts.find((a) => a._id === form.disasterId.value);

    const newRequest = {
      disasterId: form.disasterId.value,
      name: user?.displayName || "Anonymous",
      contact: user?.email || "",
      helpType: form.helpType.value,
      location: selectedAlert?.location || "",
      coordinates: selectedAlert?.coordinates || null,
      description: form.description.value,
      familyMembers: form.familyMembers.value,
      injuredCount: form.injuredCount.value,
      elderlyOrChildren: form.elderlyOrChildren.value,
      urgentNeeds: form.urgentNeeds.value,
      additionalNotes: form.additionalNotes.value,
      status: navigator.onLine ? "Active" : "Pending",
      networkStatus: navigator.onLine ? "Online" : "Offline",
      submittedBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
      timestamp: new Date().toISOString(),
    };

    if (!navigator.onLine) {
      saveOfflineRequest(newRequest);
      Swal.fire(
        "Offline Mode",
        "You are offline. Your help request has been saved and will sync automatically.",
        "info"
      );
      form.reset();
      return;
    }

    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit("newRequestHelp", data);
        Swal.fire("Success", "Help request submitted successfully!", "success");
        form.reset();
      })
      .catch((err) => {
        console.error("Submit error:", err);
        Swal.fire("Error", "Something went wrong while submitting!", "error");
      });
  };

  if (!user) return <AccessDenialMessage />;

  return (
    <div className="max-w-5xl mx-auto pb-20 pt-16 px-10">
      <RequestHelpsMap />

      {/* Pending Offline Requests */}
      {offlineRequests.length > 0 && (
        <div className="mb-6 p-5 bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow-md border border-yellow-400">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold dark:text-yellow-200">Pending Offline Requests</h3>
            <button
              onClick={syncOfflineRequests}
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              Sync Now
            </button>
            <button
              onClick={clearOfflineRequests}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm dark:text-yellow-100">
            {offlineRequests.map((req, idx) => (
              <li key={idx}>
                Disaster: <strong>{req.disasterId}</strong> | Type: {req.helpType} | Status: {req.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Help Request Form */}
      <div className="bg-gradient-to-r my-10 from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Request Disaster Help
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Disaster</label>
            <select name="disasterId" required className="w-full border rounded-md p-2">
              <option value="">Select Disaster</option>
              {alerts.map((alert) => (
                <option key={alert._id} value={alert._id}>
                  {alert.headline} ({alert.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type of Help Needed</label>
            <select name="helpType" required className="w-full border rounded-md p-2">
              <option value="">Select Help Type</option>
              <option value="Medical">Medical</option>
              <option value="Rescue">Rescue</option>
              <option value="Food">Food</option>
              <option value="Shelter">Shelter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" required className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Family Members Affected</label>
            <input type="number" name="familyMembers" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of Injured</label>
            <input type="number" name="injuredCount" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Elderly or Children Affected</label>
            <input type="text" name="elderlyOrChildren" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Urgent Needs</label>
            <input type="text" name="urgentNeeds" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea name="additionalNotes" className="w-full border rounded-md p-2" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelps;
