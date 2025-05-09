import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const  AllAlertPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/alertPanel")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load alerts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading disaster alerts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Live Disaster Alerts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
      >
        {alerts.map((alert) => (
          <div key={alert._id} className="border rounded-lg shadow-lg p-4"
          onClick={() => navigate(`/alertPanel/${alert._id}`)}>
            <img
              src={alert.image}
              alt={alert.type}
              className="w-full h-48 object-cover mb-3 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200";
              }}
            />
            <h3 className="text-xl font-semibold">{alert.type}</h3>
            <p><strong>Location:</strong> {alert.location}</p>
            <p><strong>Severity:</strong> {alert.severity}</p>
            <p><strong>Year:</strong> {alert.year}</p>
            <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-600">{alert.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAlertPanel;
