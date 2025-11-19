import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IncidentManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel")
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

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-alert/${id}`);
  };

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://disaster-management-website-server.onrender.com/alertPanel/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The alert has been removed.",
              icon: "success",
            });
            // <-- This updates the UI immediately
            setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== id));
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  });
};



  if (loading) return <p>Loading disaster alerts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl font-bold mb-5 text-center">Incident Management</h2>
      <table className="min-w-full border-collapse border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 dark:bg-black">
          <tr>
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Severity</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={alert._id} className="hover:bg-gray-50 dark:hover:bg-black">
              <td className="border px-4 py-3 w-[30px]">{index + 1}</td>
              <td className="border px-3 py-3 w-[300px]">{alert.headline}</td>
              <td className="border px-3 py-3 ">{alert.location}</td>
              <td className="border px-3 py-3">{alert.severity}</td>
              <td className="border px-3 py-3">{alert.timestamp}</td>
              <td className="border px-3 py-3 flex items-center">
                <button
                  onClick={() => handleEdit(alert._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                Edit
                </button>
                <button
                  onClick={() => handleDelete(alert._id)}
                  className="bg-red-500 text-white py-1 px-1  rounded hover:bg-red-600"
                >
                 <MdDeleteForever  className="text-2xl "/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentManagement;
