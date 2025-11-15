import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LiveAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('https://disaster-management-website-server.onrender.com/alertPanel'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const activeAlerts = data.filter(alert => alert.status === 'Active');
        setAlerts(activeAlerts);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  // Helper to color-code severity
  const severityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="pb-8 lg:pt-24 pt-10 lg:w-[1024px] w-[90%] mx-auto">
      <h2 className="text-4xl tracking-widest text-center text-gray-800 font-anton dark:text-white mb-12">
        Live Disaster Alerts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-6">
        {alerts.map((alert) => (
          <div
            key={alert._id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-red-200 hover:scale-105 transform transition duration-300 ease-in-out"
            onClick={() => navigate(`/alertPanel/${alert._id}`)}
          >
            <div className="relative">
              <img src={alert.image} alt={alert.type} className="w-full h-56 object-cover" />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${severityColor(alert.severity)}`}
              >
                {alert.severity}
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
              <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 hover:underline mb-2">
                {alert.headline}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{alert.description}</p>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span><strong>Type:</strong> {alert.type}</span>
                <span><strong>Location:</strong> {alert.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAlert;
