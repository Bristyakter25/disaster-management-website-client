import React, { useEffect, useState } from "react";
import { ArrowRightCircle, Calendar } from "lucide-react";

const disasterTypes = ["Flood", "Earthquake", "Fire", "Cyclone", "Landslide", "Other"];
const priorityLevels = ["Low", "Medium", "High", "Critical"];
const statusOptions = ["Pending", "In Progress", "Completed"];

const AssignMissions = () => {
  const [rescuers, setRescuers] = useState([]);
  const [mission, setMission] = useState({
    title: "",
    description: "",
    disasterType: "",
    severity: "Low",
    priority: "Medium",
    notes: "",
    address: "",
    deadline: "",
    estimatedResponseTime: "",
    status: "Pending",
    assignedTo: "",
  });

  useEffect(() => {
    fetch("https://disaster-management-website-server.vercel.app/rescuerProfile")
      .then((res) => res.json())
      .then((data) => setRescuers(data))
      .catch((err) => console.error("Error fetching rescuers:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...mission, location: mission.address };

    try {
      const response = await fetch("https://disaster-management-website-server.vercel.app/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Mission assigned successfully!");
        setMission({
          title: "",
          description: "",
          disasterType: "",
          severity: "Low",
          priority: "Medium",
          notes: "",
          address: "",
          deadline: "",
          estimatedResponseTime: "",
          status: "Pending",
          assignedTo: "",
        });
      } else {
        throw new Error("Failed to assign mission");
      }
    } catch (error) {
      console.error("Error assigning mission:", error);
      alert("Failed to assign mission.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-2xl px-8 mb-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl py-5 font-bold dark:text-white text-gray-800 mb-2">
          🛡️ Assign Rescue Mission
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          Fill in the details below to dispatch a team to the disaster site!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={mission.title}
          onChange={handleChange}
          placeholder="Mission Title *"
          required
          className="border p-3 rounded-md text-black dark:text-white bg-white dark:bg-slate-800 focus:ring-2 ring-blue-500"
        />

        {/* Disaster Type */}
        <select
          name="disasterType"
          value={mission.disasterType}
          onChange={handleChange}
          required
          className="border p-3 rounded-md text-black dark:text-white bg-white dark:bg-slate-800 focus:ring-2 ring-blue-500"
        >
          <option value="">Select Disaster Type *</option>
          {disasterTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Severity */}
        <select
          name="severity"
          value={mission.severity}
          onChange={handleChange}
          className="border p-3 text-black dark:text-white rounded-md bg-white dark:bg-slate-800 focus:ring-2 ring-blue-500"
        >
          <option value="Low">Severity: Low</option>
          <option value="Moderate">Severity: Moderate</option>
          <option value="High">Severity: High</option>
        </select>

        {/* Priority */}
        <select
          name="priority"
          value={mission.priority}
          onChange={handleChange}
          className="border p-3 text-black dark:text-white rounded-md bg-white dark:bg-slate-800 focus:ring-2 ring-blue-500"
        >
          {priorityLevels.map((level) => (
            <option key={level} value={level}>
              Priority: {level}
            </option>
          ))}
        </select>

        {/* Estimated Response Time */}
        <input
          type="text"
          name="estimatedResponseTime"
          value={mission.estimatedResponseTime}
          onChange={handleChange}
          placeholder="Estimated Response Time (e.g. 2 hours)"
          className="border text-black dark:text-white p-3 bg-white dark:bg-slate-800 rounded-md focus:ring-2 ring-blue-500"
        />

        {/* Deadline with Calendar Picker */}
        <div className="relative">
          <input
            type="datetime-local"
            name="deadline"
            value={mission.deadline}
            onChange={handleChange}
            className="border text-black dark:text-white p-3 bg-white dark:bg-slate-800 rounded-md focus:ring-2 ring-blue-500 w-full"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>

        {/* Address */}
        <input
          type="text"
          name="address"
          value={mission.address}
          onChange={handleChange}
          placeholder="Disaster Location Address *"
          required
          className="border text-black dark:text-white p-3 bg-white dark:bg-slate-800 rounded-md focus:ring-2 ring-blue-500 col-span-1 md:col-span-2"
        />

        {/* Description */}
        <textarea
          name="description"
          value={mission.description}
          onChange={handleChange}
          placeholder="Detailed Description of the Mission"
          className="border p-3 text-black dark:text-white rounded-md bg-white dark:bg-slate-800 focus:ring-2 ring-blue-500 col-span-1 md:col-span-2"
          rows={4}
        />

        {/* Notes */}
        <textarea
          name="notes"
          value={mission.notes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          className="border text-black dark:text-white p-3 bg-white dark:bg-slate-800 rounded-md focus:ring-2 ring-blue-500 col-span-1 md:col-span-2"
          rows={3}
        />

        {/* Rescuer */}
        <select
          name="assignedTo"
          value={mission.assignedTo}
          onChange={handleChange}
          required
          className="border text-black dark:text-white p-3 bg-white dark:bg-slate-800 rounded-md focus:ring-2 ring-blue-500 col-span-1 md:col-span-2"
        >
          <option value="">Select Rescuer *</option>
          {rescuers.map((rescuer) => (
            <option key={rescuer._id} value={rescuer.email}>
              {rescuer.email} — {rescuer.location} — {rescuer.specialty}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 text-white text-lg py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          <ArrowRightCircle className="w-5 h-5" />
          Assign Mission
        </button>
      </form>
    </div>
  );
};

export default AssignMissions;
