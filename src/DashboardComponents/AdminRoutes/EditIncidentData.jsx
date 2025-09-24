import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";


const EditIncidentData = () => {
  const { id } = useParams(); // get alert id from route
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [alertData, setAlertData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://disaster-management-website-server.vercel.app/alertPanel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAlertData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load alert data!", "error");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAlert = {
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

      // Donation fields
      donationNeeded: form.donationNeeded.checked,
      donationGoal: form.donationGoal.value ? parseInt(form.donationGoal.value) : 0,
      donationCategory: form.donationCategory.value || "general",
      donationReceived: alertData?.donationReceived || 0, // keep existing

      submittedBy: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
      },
      status: form.status.value,
    };

    fetch(`https://disaster-management-website-server.vercel.app/alertPanel/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAlert),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Alert updated successfully!", "success");
        navigate("/dashboard/incidentManagement"); // go back to list
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update alert!", "error");
      });
  };

  if (loading) return <p>Loading alert data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 shadow-md rounded-xl mt-20">
      <h2 className="text-2xl text-center font-bold mb-6 dark:text-white text-gray-800">
        Edit Alert Panel
      </h2>
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
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              defaultValue={
                name === "timestamp"
                  ? alertData?.timestamp?.split("T")[0]
                  : alertData?.[name] || ""
              }
              required
              className="w-full bg-white dark:bg-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">
            Severity
          </label>
          <select
            name="severity"
            defaultValue={alertData?.severity}
            required
            className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Donation fields */}
        <div className="pt-5 pb-10 border-y-4">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Donation Settings</h3>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              name="donationNeeded"
              defaultChecked={alertData?.donationNeeded}
            />
            <label htmlFor="donationNeeded" className="dark:text-white">
              Enable Donations for this Disaster
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-white mb-1">
              Donation Goal (BDT)
            </label>
            <input
              type="number"
              name="donationGoal"
              defaultValue={alertData?.donationGoal || ""}
              className="w-full border dark:bg-black bg-white rounded-md px-3 py-2"
            />
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium dark:text-white mb-1">
              Donation Category
            </label>
            <select
              name="donationCategory"
              defaultValue={alertData?.donationCategory || "general"}
              className="w-full border dark:bg-black bg-white rounded-md px-3 py-2"
            >
              <option value="general">General Relief</option>
              <option value="food">Food & Water</option>
              <option value="shelter">Shelter</option>
              <option value="medical">Medical</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mt-5 text-sm font-medium dark:text-white text-gray-700 mb-1">
            Details
          </label>
          <textarea
            name="details"
            required
            rows={3}
            defaultValue={alertData?.details}
            className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={2}
            defaultValue={alertData?.description}
            className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            defaultValue={alertData?.status}
            required
            className="w-full border dark:bg-black bg-white border-gray-300 rounded-md px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Update Alert
        </button>
      </form>
    </div>
  );
};

export default EditIncidentData;
