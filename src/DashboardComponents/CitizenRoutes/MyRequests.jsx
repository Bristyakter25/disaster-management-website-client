import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [disasters, setDisasters] = useState([]);
  const navigate = useNavigate();

  // Fetch reports submitted by the logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://disaster-management-website-server.onrender.com/requestHelps?contact=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setDisasters(data))
        .catch((err) => console.error("Error fetching reports:", err));
    }
  }, [user]);

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://disaster-management-website-server.onrender.com/requestHelps/${id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your report has been removed.",
                "success"
              );
              setDisasters((prev) =>
                prev.filter((alert) => alert._id !== id)
              );
            }
          })
          .catch((err) => console.error("Delete error:", err));
      }
    });
  };

  // Handle update
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-alert/${id}`);
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
        My Submitted Requests
      </h2>

      {disasters.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No requests submitted by you.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Disaster</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Help Type</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Family Members</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Injured</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Elderly/Children</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Urgent Needs</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Notes</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Network</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {disasters.map((item) => (
                <tr key={item._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.helpType}</td>
                  <td className="px-4 py-2">{item.familyMembers}</td>
                  <td className="px-4 py-2">{item.injuredCount}</td>
                  <td className="px-4 py-2">{item.elderlyOrChildren}</td>
                  <td className="px-4 py-2">{item.urgentNeeds}</td>
                  <td className="px-4 py-2">{item.additionalNotes}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-semibold ${
                        item.networkStatus === "Offline"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.networkStatus}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
