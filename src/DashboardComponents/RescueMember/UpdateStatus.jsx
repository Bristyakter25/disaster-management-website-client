import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [photos, setPhotos] = useState("");

  // Fetch mission by ID
  useEffect(() => {
    fetch(`https://disaster-management-website-server.onrender.com/missions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMission(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Update Status
  const handleStatusUpdate = async (status) => {
    await fetch(`https://disaster-management-website-server.onrender.com/missions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    alert("Status updated");
    navigate("/dashboard/assigned-missions");
  };

  // Request Resources
  const handleResourceRequest = async () => {
    const details = prompt("Describe the resources needed:");

    await fetch(`https://disaster-management-website-server.onrender.com/missions/${id}/resources`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details }),
    });

    alert("Resource request sent");
  };

  // Upload Post-Mission Summary
  const handlePostMission = async () => {
    await fetch(`https://disaster-management-website-server.onrender.com/missions/${id}/postMission`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary,
        photos: photos.split(","),
      }),
    });

    alert("Post-mission summary uploaded");
    navigate("/dashboard/assigned-missions");
  };

  if (loading)
    return <div className="text-center py-10">Loading mission...</div>;

  if (!mission)
    return <div className="text-center py-10">Mission not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Update Mission – {mission.title}
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-4">
        <p><strong>Severity:</strong> {mission.severity}</p>
        <p><strong>Status:</strong> {mission.status}</p>
        <p><strong>Location:</strong> {mission.location.address}</p>
        <p><strong>Notes:</strong> {mission.notes}</p>
      </div>

      {/* --- STATUS UPDATE --- */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Update Status</h2>

        <div className="flex gap-4">
          <button
            onClick={() => handleStatusUpdate("In-Progress")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Mark In-Progress
          </button>

          <button
            onClick={() => handleStatusUpdate("Completed")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Mark Completed
          </button>
        </div>
      </div>

      {/* --- RESOURCE REQUEST --- */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Request Additional Resources</h2>
        <button
          onClick={handleResourceRequest}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Request Resources
        </button>
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
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Upload Summary
        </button>
      </div>
    </div>
  );
};

export default UpdateStatus;
