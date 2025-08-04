import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // optional icon lib

const MarqueeAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alertPanel");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const activeAlerts = data.filter((alert) => alert.status === "Active");
        setAlerts(activeAlerts);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-white to-red-200 shadow-md h-[80px] flex items-center rounded-md overflow-hidden">
    
      <div className="bg-red-600 h-full flex items-center px-5 text-white font-bold text-lg tracking-wide">
        <AlertTriangle className="mr-2" size={20} />
        Live Alerts
      </div>

      {/* Scrolling content */}
      {alerts.length > 0 ? (
        <Link to="/liveAlerts" className="flex-1 hover:brightness-90 transition duration-300">
          <Marquee speed={50} pauseOnHover gradient={false} className="px-4">
            {alerts.map((alert, index) => (
              <span key={index} className="text-red-800 font-semibold mx-10 whitespace-nowrap">
                🚨 {alert.headline}
              </span>
            ))}
          </Marquee>
        </Link>
      ) : (
        <p className="flex-1 text-center text-gray-600 text-sm px-4">No active alerts at the moment.</p>
      )}
    </div>
  );
};

export default MarqueeAlert;
