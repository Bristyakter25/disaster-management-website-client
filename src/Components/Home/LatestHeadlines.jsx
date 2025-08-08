import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const  LatestHeadlines = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/latestAlerts")
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
    <div className="max-w-3xl mt-10  ">
      <h2 className="text-2xl font-bold mb-4">Latest Headlines</h2>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
        {alerts.map((alert) => (
          <div key={alert._id} className=" rounded-lg shadow-lg "
          onClick={() => navigate(`/latestAlerts/${alert._id}`)}>
            <img
              src={alert.image}
              alt={alert.type}
              className="w-full h-60  mb-3 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200";
              }}
            />
            
            <div className="flex py-3 px-3 justify-between items-center mr-2">
            <h3 className="text-xl font-semibold">{alert.type}</h3>
            <button className="btn px-2 dark:bg-black  ">{alert.location}</button>
            
            
            </div>
            <p className="my-5 px-3 hover:underline text-xl font-bold ">{alert.details}</p>
            <p className="mb-2 px-3"><strong>Severity:</strong> {alert.severity}</p>
            <p className="mb-2 px-3"><strong>Year:</strong> {alert.year}</p>
            <p className="mb-2 px-3"><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHeadlines;
