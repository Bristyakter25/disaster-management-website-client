import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import socket from "../Shared/socket";
import { AuthContext } from "../providers/AuthProvider";

const AddAlertPanels = () => {
  const [alerts, setAlerts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    socket.on("newAlert", (newAlert) => {
      setAlerts((prevAlerts) => {
        if (prevAlerts.some((alert) => alert._id === newAlert._id)) return prevAlerts;
        return [newAlert, ...prevAlerts];
      });
    });

    return () => {
      socket.off("newAlert");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAlert = {
      headline: form.headline.value,
      type: form.type.value,
      description: form.description.value,
      location: form.location.value,
      severity: form.severity.value,
      timestamp: new Date(form.timestamp.value).toISOString(),
      year: parseInt(form.year.value),
      details: form.details.value,
      image: form.image.value,
      affectedPopulation: parseInt(form.affectedPopulation.value),
      requiredResources: form.requiredResources.value,
   submittedBy: {
    name: user?.displayName || "Anonymous",
    email: user?.email
  
  },
      status: form.status.value,
    };

    fetch("http://localhost:5000/alertPanel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAlert),
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit("newAlert", data);
        Swal.fire("Success", "Alert added successfully!", "success");
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Alert Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
        {[
          { label: "Headline", name: "headline", type: "text" },
          { label: "Type", name: "type", type: "text" },
          { label: "Location", name: "location", type: "text" },
         
          { label: "Timestamp", name: "timestamp", type: "date" },
          { label: "Year", name: "year", type: "number" },
          { label: "Image URL", name: "image", type: "text" },
          { label: "Number of People Affected", name: "affectedPopulation", type: "number" },
          { label: "Required Resources", name: "requiredResources", type: "text" },
         
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
  <select
    name="severity"
    required
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">-- Select Severity --</option>
    <option value="Low">Low</option>
    <option value="Moderate">Moderate</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
  </select>
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
          <textarea
            name="details"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
  <select
    name="status"
    required
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">-- Select Status --</option>
    <option value="Active">Active</option>
    <option value="Under Review">Under Review</option>
    <option value="Resolved">Resolved</option>
  </select>
</div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Alert
        </button>
      </form>
    </div>
  );
};

export default AddAlertPanels;
