import { useEffect, useState } from 'react';

const LiveAlert = () => {
  const [alerts, setAlerts] = useState([]);

 useEffect(() => {
  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/alertPanel'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Filter only alerts with status: "active"
      const activeAlerts = data.filter(alert => alert.status === 'Active');
      setAlerts(activeAlerts);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  fetchAlerts();
}, []);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Live Disaster Alerts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div key={alert._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-red-300">
            <img src={alert.image} alt={alert.type} className="w-full h-[250px] " />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-red-700">{alert.headline}</h3>
              <p className="text-sm text-gray-600 mb-2">{new Date(alert.timestamp).toLocaleString()}</p>
              <p className="text-gray-800 mb-2">{alert.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                <span><strong>Type:</strong> {alert.type}</span>
                <span><strong>Severity:</strong> {alert.severity}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1"><strong>Location:</strong> {alert.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAlert;
