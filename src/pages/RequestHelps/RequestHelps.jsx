import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import AccessDenialMessage from "../../Shared/SecuredMessage/AccessDenialMessage";
import RequestHelpsMap from "./RequestHelpsMap";


const RequestHelps = () => {
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    disasterId: "",
    name: "",
    contact: "",
    helpType: "",
    location: "",
    coordinates: null, // added coordinates field
    description: "",
    familyMembers: "",
    injuredCount: "",
    elderlyOrChildren: "",
    urgentNeeds: "",
    additionalNotes: "",
  });

  // Populate user info if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        contact: user.email || "",
      }));
    }
  }, [user]);

  // Fetch alerts from server
  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch alerts");
        return res.json();
      })
      .then((data) => setAlerts(data))
      .catch((err) => console.error("Error loading alerts:", err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "disasterId") {
      const selectedDisaster = alerts.find((alert) => alert._id === value);
      setFormData((prev) => ({
        ...prev,
        disasterId: value,
        location: selectedDisaster ? selectedDisaster.location : "",
        coordinates: selectedDisaster ? selectedDisaster.coordinates : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit help request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.coordinates) {
      alert("Selected disaster does not have valid coordinates.");
      return;
    }

    try {
      const res = await fetch(
        "https://disaster-management-website-server.onrender.com/requestHelps",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit request");

      alert("Help request submitted successfully!");
      setFormData((prev) => ({
        disasterId: "",
        name: user?.displayName || "",
        contact: user?.email || "",
        helpType: "",
        location: "",
        coordinates: null,
        description: "",
        familyMembers: "",
        injuredCount: "",
        elderlyOrChildren: "",
        urgentNeeds: "",
        additionalNotes: "",
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to submit request. Please try again.");
    }
  };

  if (!user) return <AccessDenialMessage />;

  return (
    <div className="max-w-5xl mx-auto pb-20 pt-16 px-10">
       {/* Map */}
        <RequestHelpsMap />
      <div className="bg-gradient-to-r my-10 from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Request Disaster Help
        </h2>

       

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {/* Disaster Selector */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Select Disaster
            </label>
            <select
              name="disasterId"
              value={formData.disasterId}
              onChange={handleChange}
              className="input bg-white dark:bg-black input-bordered w-full border-2 border-gray-300 rounded-xl px-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              required
            >
              <option value="">Select Disaster</option>
              {alerts.map((alert) => (
                <option key={alert._id} value={alert._id}>
                  {alert.headline} ({alert.type})
                </option>
              ))}
            </select>
          </div>

          {/* Name and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="input input-bordered w-full dark:bg-black bg-gray-100 rounded-xl p-3 cursor-not-allowed"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Your Email
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                className="input input-bordered w-full bg-gray-100 rounded-xl  dark:bg-black p-3 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          {/* Help Type */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Type of Help Needed
            </label>
            <select
              name="helpType"
              value={formData.helpType}
              onChange={handleChange}
              className="input bg-white dark:bg-black input-bordered w-full border-2 border-gray-300 rounded-xl px-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              required
            >
              <option value="">Select Help Type</option>
              <option value="Medical">Medical</option>
              <option value="Rescue">Rescue</option>
              <option value="Food">Food</option>
              <option value="Shelter">Shelter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location (read-only) */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Location of Disaster
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              className="input dark:bg-black input-bordered w-full bg-gray-100 rounded-xl px-3 cursor-not-allowed"
              readOnly
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Describe Your Situation
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your situation..."
              className="textarea bg-white dark:bg-black textarea-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Family Members Affected
              </label>
              <input
                type="number"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                placeholder="Number of people affected"
                className="input bg-white dark:bg-black input-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Number of Injured
              </label>
              <input
                type="number"
                name="injuredCount"
                value={formData.injuredCount}
                onChange={handleChange}
                placeholder="Number of injured people"
                className="input bg-white dark:bg-black input-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Elderly or Children Affected
              </label>
              <input
                type="text"
                name="elderlyOrChildren"
                value={formData.elderlyOrChildren}
                onChange={handleChange}
                placeholder="Specify if elderly or children are affected"
                className="input bg-white dark:bg-black input-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Urgent Needs
              </label>
              <input
                type="text"
                name="urgentNeeds"
                value={formData.urgentNeeds}
                onChange={handleChange}
                placeholder="Food, medicine, shelter, etc."
                className="input bg-white dark:bg-black input-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any other important information"
              className="textarea bg-white dark:bg-black textarea-bordered w-full rounded-xl p-3 border-2 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestHelps;
