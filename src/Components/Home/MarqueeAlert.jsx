import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const MarqueeAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alertPanel");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
    <div className="bg-red-100 h-[80px]  flex items-center">
      {/* Fixed label on the left */}
      <div className="bg-red-600 h-full flex justify-center items-center text-white px-4 py-2 font-bold text-lg shrink-0">
        Live Alerts
      </div>

      {/* Scrolling alerts */}
      {alerts.length > 0 ? (
        <Link to="/liveAlerts">
        <Marquee speed={50} pauseOnHover gradient={false} className="flex-1">
          {alerts.map((alert, index) => (
            <span key={index} className="text-red-700 text-lg font-semibold mx-8">
              🚨 {alert.headline}
            </span>
          ))}
        </Marquee>
        </Link>
      ) : (
        <p className="text-center text-gray-500 flex-1 ml-4">
          No active alerts at the moment.
        </p>
      )}
    </div>
  );
};

export default MarqueeAlert;
