import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MissionDetails = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/missions/${id}`)
      .then((res) => res.json())
      .then((data) => setMission(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!mission)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin dark:border-blue-600"></div>
      </div>
    );

  const severityColor =
    mission.severity === "High"
      ? "bg-red-500 text-white"
      : mission.severity === "Moderate"
      ? "bg-yellow-400 text-black"
      : "bg-green-500 text-white";

  const statusColor =
    mission.status === "Pending"
      ? "bg-orange-400 text-white"
      : mission.status === "In Progress"
      ? "bg-blue-500 text-white"
      : "bg-green-600 text-white";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        Mission Details
      </h1>

      {/* Mission Card */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-4 border border-gray-100 dark:border-gray-700">
        {/* Title & Badges */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{mission.title}</h2>
          <div className="flex gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColor}`}>
              Severity: {mission.severity}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
              Status: {mission.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Description:</h3>
          <p className="text-gray-800 dark:text-gray-200">
            {mission.description || "No description available."}
          </p>
        </div>

        {/* Notes */}
        {mission.notes && (
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Notes:</h3>
            <p className="text-gray-800 dark:text-gray-200">{mission.notes}</p>
          </div>
        )}

        {/* Location */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Location:</h3>
          <p className="text-gray-800 dark:text-gray-200">{mission.location?.address || "N/A"}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Coordinates: {mission.location?.lat || "N/A"}, {mission.location?.lng || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;
