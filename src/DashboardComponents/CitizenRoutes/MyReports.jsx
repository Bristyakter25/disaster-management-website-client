import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyReports = () => {
  const { user } = useContext(AuthContext);
  const [disasters, setDisasters] = useState([]);
  const navigate = useNavigate();

  // Fetch reports submitted by the logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`https://disaster-management-website-server.onrender.com/alertPanel?email=${user.email}`)
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
        fetch(`https://disaster-management-website-server.onrender.com/alertPanel/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your report has been removed.", "success");
              setDisasters((prev) => prev.filter((alert) => alert._id !== id));
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
    <div className="px-4 md:px-5 lg:px-5 py-5 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800 dark:text-white">
        My Submitted Alerts
      </h2>

      {disasters.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No alerts submitted by you.
        </p>
      ) : (
        <div  className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {disasters.map((item) => (
            <div onClick={() => navigate(`/alertPanel/${item._id}`)}
              key={item._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt="Disaster"
                  className="w-full h-60  group-hover:brightness-90 transition duration-300"
                />
              </div>
              <div className="py-5 px-3 space-y-3">
              
                  <h3 className="text-xl h-[100px] font-bold text-red-600 dark:text-red-400">
                  🚨 {item.headline}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{item.type}</span> | Severity:{" "}
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                    {item.severity}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📍 {item.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
         <button
  onClick={(e) => {
    e.stopPropagation(); // prevent parent card click
    handleEdit(item._id);
  }}
  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
>
  Edit
</button>

<button
  onClick={(e) => {
    e.stopPropagation(); // prevent parent click
    handleDelete(item._id);
  }}
  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
>
  Delete
</button>

               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
