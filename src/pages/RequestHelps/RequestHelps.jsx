import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import RequestHelpsMap from "./RequestHelpsMap";
import AccessDenialMessage from "../../Shared/SecuredMessage/AccessDenialMessage";
import socket from "../../Shared/socket";
import { FiUsers, FiAlertTriangle, FiClipboard, FiHome, FiHeart } from "react-icons/fi";

const RequestHelps = () => {
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [offlineRequests, setOfflineRequests] = useState([]);

  const SERVER_URL = "https://disaster-management-website-server.onrender.com/requestHelps";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    setOfflineRequests(saved);
  }, []);

  const saveOfflineRequest = (request) => {
    const existing = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    const updated = [...existing, request];
    localStorage.setItem("offlineRequests", JSON.stringify(updated));
    setOfflineRequests(updated);
  };

  const clearOfflineRequests = () => {
    localStorage.removeItem("offlineRequests");
    setOfflineRequests([]);
    Swal.fire("Deleted", "All pending offline requests have been removed.", "info");
  };

  const syncOfflineRequests = async () => {
    const offlineRequestsLocal = JSON.parse(localStorage.getItem("offlineRequests")) || [];
    if (!offlineRequestsLocal.length) return;

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
        remaining.push(req);
      }
    }

    Swal.close();

    if (!remaining.length) {
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

  useEffect(() => {
    const handleOnline = () => syncOfflineRequests();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

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
      submittedBy: { name: user?.displayName || "Anonymous", email: user?.email },
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
      .catch(() => Swal.fire("Error", "Something went wrong!", "error"));
  };

  if (!user) return <AccessDenialMessage />;

  return (
    <div className="max-w-6xl mx-auto pb-20 pt-10 px-6">
      <RequestHelpsMap />

      {/* Offline Requests */}
      {offlineRequests.length > 0 && (
        <div className="mb-6 p-5 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-md border border-yellow-400">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
            <h3 className="font-semibold dark:text-yellow-200 text-lg">Pending Offline Requests</h3>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={syncOfflineRequests}
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
              >
                Sync Now
              </button>
              <button
                onClick={clearOfflineRequests}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Clear All
              </button>
            </div>
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
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mt-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Request Disaster Help
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Disaster Selection */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Select Disaster</label>
            <select
              name="disasterId"
              required
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Disaster</option>
              {alerts.map((alert) => (
                <option key={alert._id} value={alert._id}>
                  {alert.headline} ({alert.type})
                </option>
              ))}
            </select>
          </div>

          {/* Help Type */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Type of Help Needed</label>
            <select
              name="helpType"
              required
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Help Type</option>
              <option value="Medical">Medical</option>
              <option value="Rescue">Rescue</option>
              <option value="Food">Food</option>
              <option value="Shelter">Shelter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Description</label>
            <textarea
              name="description"
              required
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Family & Injured */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium dark:text-gray-200">Family Members Affected</label>
              <input
                type="number"
                name="familyMembers"
                className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium dark:text-gray-200">Number of Injured</label>
              <input
                type="number"
                name="injuredCount"
                className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Elderly / Children */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Elderly or Children Affected</label>
            <input
              type="text"
              name="elderlyOrChildren"
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Urgent Needs */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Urgent Needs</label>
            <input
              type="text"
              name="urgentNeeds"
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-1">
            <label className="block text-sm font-medium dark:text-gray-200">Additional Notes</label>
            <textarea
              name="additionalNotes"
              className="w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelps;
