import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiCheckCircle, FiUserPlus, FiXCircle } from "react-icons/fi";
import Swal from 'sweetalert2';

const ManageHelpRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch requests
  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/requestHelps")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load requests.");
        setLoading(false);
      });
  }, []);

  // Update request status
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`https://disaster-management-website-server.onrender.com/requestHelps/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update state immediately
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Failed updating:", err);
    }
  };

  // Handle Verify action
  const handleVerify = (id) => {
    Swal.fire({
      title: 'Verify Request?',
      text: "Do you want to mark this request as verified?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, verify it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id, "Verified");
        Swal.fire('Verified!', 'The request has been verified.', 'success');
      }
    });
  };

  // Handle Reject action
  const handleReject = (id) => {
    Swal.fire({
      title: 'Reject Request?',
      text: "Do you want to reject/delete this request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(id, "Rejected");
        Swal.fire('Rejected!', 'The request has been rejected.', 'success');
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5 text-center">Manage Help Requests</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{requests.length}</p>
          <p>Total Requests</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{requests.filter(r => r.status === "Verified").length}</p>
          <p>Verified</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{requests.filter(r => r.status === "Pending").length}</p>
          <p>Pending</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl text-center">
          <p className="text-xl font-bold">{requests.filter(r => r.status === "Rejected").length}</p>
          <p>Rejected</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Citizen</th>
              <th className="p-2 border">Help Type</th>
              <th className="p-2 border">Severity</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} className="text-center">
                <td className="p-2 border">{req.name}</td>
                <td className="p-2 border">{req.helpType}</td>
                <td className="p-2 border">{req.severity}</td>
                <td className="p-2 border">{req.location}</td>
                <td className="p-2 border">
                  <select
                    value={req.status || "Pending"}
                    className="border p-1 rounded"
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-2 border flex justify-center space-x-2 items-center">

                  {/* View */}
                  <div className="relative group">
                    <button
                      className="text-gray-700 bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition"
                      onClick={() => navigate(`/dashboard/manageHelpRequests/${req._id}`)}
                    >
                      <FiEye size={20} />
                    </button>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      View
                    </span>
                  </div>

                  {/* Verify / Reject conditional */}
                  {req.status === "Verified" ? (
                    <FiCheckCircle size={35} className="text-green-700" />
                  ) : req.status === "Rejected" ? (
                    <FiXCircle size={35} className="text-red-700" />
                  ) : (
                    <>
                      <button
                        className="text-green-700 bg-green-100 p-2 rounded-md hover:bg-green-200 transition"
                        onClick={() => handleVerify(req._id)}
                      >
                        <FiCheckCircle size={20} />
                      </button>
                      <button
                        className="text-red-700 bg-red-100 p-2 rounded-md hover:bg-red-200 transition"
                        onClick={() => handleReject(req._id)}
                      >
                        <FiXCircle size={20} />
                      </button>
                    </>
                  )}

                  {/* Assign */}
                  <div className="relative group">
                    <button
                      className="text-indigo-700 bg-indigo-100 p-2 rounded-md hover:bg-indigo-200 transition"
                      onClick={() => navigate("/dashboard/resourceAllocation")}
                    >
                      <FiUserPlus size={20} />
                    </button>
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                      Assign
                    </span>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHelpRequests;
