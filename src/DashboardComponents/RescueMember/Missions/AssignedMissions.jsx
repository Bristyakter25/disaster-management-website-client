import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue for Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const AssignedMissions = () => {
  const { user } = useContext(AuthContext);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    fetch(`https://disaster-management-website-server.vercel.app/missions?assignedTo=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch missions");
        return res.json();
      })
      .then((data) => {
        setMissions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 dark:text-gray-300 text-lg animate-pulse">
          Loading user info...
        </p>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin dark:border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg font-semibold dark:text-red-400">
          Error: {error}
        </p>
      </div>
    );

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        My Assigned Missions
      </h1>

      {missions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
          <svg
            className="w-20 h-20 text-blue-400 mb-4 animate-bounce dark:text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2 text-center">
            No Assigned Missions Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            You don’t have any assigned tasks at the moment. Once a mission is assigned, it will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Mission Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <div
                key={mission._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                  {mission.title}
                </h2>

                <p>
                  <span className="font-semibold">Severity:</span>{" "}
                  <span
                    className={`${
                      mission.severity === "High"
                        ? "text-red-600 dark:text-red-400"
                        : mission.severity === "Moderate"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    } font-semibold`}
                  >
                    {mission.severity}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`${
                      mission.status === "Pending"
                        ? "text-orange-600 dark:text-orange-400"
                        : mission.status === "In Progress"
                        ? "text-blue-600 dark:text-blue-300"
                        : "text-green-600 dark:text-green-400"
                    } font-semibold`}
                  >
                    {mission.status}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {mission.location?.address || "N/A"}
                  </span>
                </p>

                <p className="mt-2 h-[100px]">
                  <span className="font-semibold">Notes:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {mission.notes || "No additional notes."}
                  </span>
                </p>

                <button
                  className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 dark:hover:from-purple-700 dark:hover:to-indigo-600 transition-all duration-300"
                  onClick={() => navigate(`/dashboard/missions/${mission._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Map View */}
          <div className="mt-10 h-[400px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer
              center={[missions[0].location?.lat || 0, missions[0].location?.lng || 0]}
              zoom={6}
              scrollWheelZoom={ false}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {missions.map((mission) => (
                mission.location?.lat &&
                mission.location?.lng && (
                  <Marker
                    key={mission._id}
                    position={[mission.location.lat, mission.location.lng]}
                  >
                    <Popup>
                      <strong>{mission.title}</strong> <br />
                      Severity: {mission.severity} <br />
                      Status: {mission.status}
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignedMissions;
