import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const EditHelpRequest = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch existing help request by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://disaster-management-website-server.onrender.com/requestHelps/${id}`);
        const data = await res.json();

        console.log("Fetched data:", data); // Debug log

        // Some servers send [object] or {data: {...}}, so normalize it:
        const normalized = Array.isArray(data) ? data[0] : data?.data || data;
        setFormData(normalized);
      } catch (error) {
        console.error("Error loading request:", error);
      }
    };
    fetchData();
  }, [id]);

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://disaster-management-website-server.onrender.com/requestHelps/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire("✅ Updated!", "Your help request has been updated successfully.", "success");
        navigate("/dashboard/myRequests");
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("❌ Error", "Failed to update the request.", "error");
    }
  };

  // ✅ Loading state
  if (!formData) {
    return <p className="text-center text-gray-500 mt-10">Loading request data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
        Update Help Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
      >
        {/* Help Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Help Type</label>
          <select
            name="helpType"
            value={formData.helpType || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Help Type</option>
            <option value="Medical">Medical</option>
            <option value="Rescue">Rescue</option>
            <option value="Food">Food</option>
            <option value="Shelter">Shelter</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-24"
          />
        </div>

        {/* Family Members */}
        <div>
          <label className="block text-sm font-medium mb-1">Family Members Affected</label>
          <input
            type="number"
            name="familyMembers"
            value={formData.familyMembers || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Injured Count */}
        <div>
          <label className="block text-sm font-medium mb-1">Number of Injured</label>
          <input
            type="number"
            name="injuredCount"
            value={formData.injuredCount || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Elderly or Children */}
        <div>
          <label className="block text-sm font-medium mb-1">Elderly or Children</label>
          <input
            type="text"
            name="elderlyOrChildren"
            value={formData.elderlyOrChildren || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Urgent Needs */}
        <div>
          <label className="block text-sm font-medium mb-1">Urgent Needs</label>
          <input
            type="text"
            name="urgentNeeds"
            value={formData.urgentNeeds || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-24"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Contact (Read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Contact Email</label>
          <input
            type="email"
            name="contact"
            value={formData.contact || user?.email || ""}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditHelpRequest;
