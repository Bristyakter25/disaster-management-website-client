import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [summary, setSummary] = useState("");
  const [photos, setPhotos] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resourceDetails, setResourceDetails] = useState("");

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

  // --- Handlers ---
  const handleStatusUpdate = async (status) => {
  await fetch(`http://localhost:5000/missions/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  Swal.fire({
    icon: "success",
    title: "Status Updated",
    text: `Mission marked as ${status}`,
    timer: 2000,
    showConfirmButton: false,
  });

  setMission({ ...mission, status });
};

  const handleResourceRequest = async () => {
    if (!resourceDetails.trim()) return;

    await fetch(`http://localhost:5000/missions/${id}/resources`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details: resourceDetails }),
    });

    Swal.fire({
      icon: "success",
      title: "Resource Request Sent",
      text: `Your request has been submitted`,
      timer: 2000,
      showConfirmButton: false,
    });

    setShowModal(false);
    setResourceDetails("");
  };

  const handlePostMission = async () => {
    if (!summary.trim()) {
      Swal.fire({
  icon: "success",
  title: "Resource Request Sent",
  text: "Your request has been submitted",
  timer: 2000,
  showConfirmButton: false,
});

      return;
    }

    await fetch(`http://localhost:5000/missions/${id}/postMission`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary,
        photos: photos.split(",").map((p) => p.trim()),
      }),
    });

    Swal.fire({
      icon: "success",
      title: "Post-Mission Uploaded",
      text: "Summary and photos uploaded successfully",
      timer: 2000,
      showConfirmButton: false,
    });

    setMission({
      ...mission,
      status: "Completed",
      postMission: { summary, photos: photos.split(",").map((p) => p.trim()) },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        Mission Details
      </h1>

      {/* Mission Card */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-4 border border-gray-100 dark:border-gray-700">
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

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Description:</h3>
          <p className="text-gray-800 dark:text-gray-200">{mission.description || "No description available."}</p>
        </div>

        {mission.notes && (
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Notes:</h3>
            <p className="text-gray-800 dark:text-gray-200">{mission.notes}</p>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Location:</h3>
          <p className="text-gray-800 dark:text-gray-200">{mission.location?.address || "N/A"}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Coordinates: {mission.location?.lat || "N/A"}, {mission.location?.lng || "N/A"}
          </p>
        </div>
      </div>

      {/* --- STATUS UPDATE --- */}
    {/* --- STATUS UPDATE --- */}
<div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl space-y-4">
  <h2 className="text-xl font-semibold">Update Status</h2>
  <div className="flex gap-4">
    <button
      onClick={() => handleStatusUpdate("In Progress")}
      className={`px-4 py-2 rounded-lg transition ${
        mission.status === "Completed"
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      disabled={mission.status === "Completed"}
    >
      {mission.status === "Completed" ? "In-Progress (Disabled)" : "Mark In-Progress"}
    </button>

    <button
      onClick={() => handleStatusUpdate("Completed")}
      className={`px-4 py-2 rounded-lg transition ${
        mission.status === "Completed"
          ? "bg-green-500 text-white cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
      disabled={mission.status === "Completed"}
    >
      {mission.status === "Completed" ? "Completed" : "Mark Completed"}
    </button>
  </div>
</div>


      {/* --- RESOURCE REQUEST --- */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Request Additional Resources</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Request Resources
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 space-y-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Request Resources
              </h3>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                rows="4"
                placeholder="Describe the resources you need..."
                value={resourceDetails}
                onChange={(e) => setResourceDetails(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  onClick={handleResourceRequest}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- POST-MISSION SUMMARY --- */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Post-Mission Summary</h2>
        <textarea
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
          rows="4"
          placeholder="Write mission summary..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></textarea>

        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
          placeholder="Photo URLs (comma separated)"
          value={photos}
          onChange={(e) => setPhotos(e.target.value)}
        />

        <button
          onClick={handlePostMission}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Upload Summary
        </button>
      </div>
    </div>
  );
};

export default MissionDetails;
