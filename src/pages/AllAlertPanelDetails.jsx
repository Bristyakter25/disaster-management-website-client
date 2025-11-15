import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AllAlertPanelDetails = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://disaster-management-website-server.onrender.com/alertPanel/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch alert details");
        return res.json();
      })
      .then((data) => {
        setAlert(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load alert details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading alert details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-16 px-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Image */}
        <img
          src={alert.image}
          alt={alert.type}
          className="w-full h-80  rounded-t-xl"
        />

        {/* Info */}
        <div className="p-8 space-y-6">
          {/* Headline and meta */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">
                {alert.headline}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{alert.type}</p>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {alert.location} | {new Date(alert.timestamp).toLocaleString()}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {alert.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Year: {alert.year}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Type: {alert.type}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Location: {alert.location}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Severity: {alert.severity}
            </div>
          </div>

          {/* Additional Details */}
          {alert.details && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Additional Details
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{alert.details}</p>
            </div>
          )}

          {/* Conditional Donate Button */}
          {alert.donationNeeded && (
            <div className="mt-6 text-center">
              <Link to="/donateUs"><button className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300">Donate</button></Link>
              <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
                Help reach the goal of {alert.donationGoal} {alert.donationCategory} units. Already received: {alert.donationReceived}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAlertPanelDetails;
