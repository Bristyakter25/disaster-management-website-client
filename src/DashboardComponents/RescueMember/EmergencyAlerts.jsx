import { useEffect, useState } from "react";

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = () => {
    fetch("http://localhost:5000/alertPanel/emergency")
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load emergency alerts:", err);
        setError("Failed to load emergency alerts");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAcknowledge = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/alertPanel/${id}/acknowledge`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to acknowledge");

      const updatedAlert = await res.json();
      // Update local state
      setAlerts((prev) =>
        prev.map((alert) => (alert._id === id ? updatedAlert : alert))
      );
    } catch (err) {
      console.error(err);
      alert("Could not acknowledge the alert.");
    }
  };

  if (loading) return <p>Loading emergency alerts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6">
      {alerts.length === 0 ? (
        <p>No emergency alerts at the moment.</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert._id} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold">{alert.headline}</h3>
            <p className="text-sm text-gray-500">{alert.type} | Severity: {alert.severity}</p>
            <p className="mt-2">{alert.description}</p>
            <p className="mt-1 text-gray-600 text-sm">Location: {alert.location}</p>
            <p className="mt-1 text-gray-600 text-sm">Affected: {alert.affectedPopulation}</p>
            <p className="mt-1 text-gray-600 text-sm font-semibold">Status: {alert.status}</p>

            {alert.status !== "Acknowledged" && (
              <button
                onClick={() => handleAcknowledge(alert._id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Acknowledge
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmergencyAlerts;
