import React from "react";
import Swal from "sweetalert2";

const AddAlertPanels = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAlert = {
      id: parseInt(form.id.value),
      type: form.type.value,
      location: form.location.value,
      severity: form.severity.value,
      timestamp: new Date(form.timestamp.value).toISOString(),
      year: parseInt(form.year.value),
      details: form.details.value,
      image: form.image.value,
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
        console.log("Alert added:", data);
        Swal.fire({
            title: "Thank You!",
            text: "You Successfully added the alert!",
            icon: "success"
          });
        form.reset();
      })
      .catch((error) => {console.error("Error adding alert:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            
          });}
      
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Alert Panel</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          
          { label: "Type", name: "type", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Severity", name: "severity", type: "text" },
          { label: "Timestamp", name: "timestamp", type: "datetime-local" },
          { label: "Year", name: "year", type: "number" },
          { label: "Image URL", name: "image", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details
          </label>
          <textarea
            name="details"
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
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
