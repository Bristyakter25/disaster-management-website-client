import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RequestDetails = () => {
    const { id } = useParams();
  const [helps, setHelps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://disaster-management-website-server.onrender.com/requestHelps/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch request details");
        return res.json();
      })
      .then((data) => {
        setHelps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load request details");
        setLoading(false);
      });
  }, [id]);

   if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading alert details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

    const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border">
      {value || "—"}
    </p>
  </div>
);


    return (
  <div className="max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Help Request Details
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

        {/* Top section */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-semibold mb-1">{helps.name}</h3>
            <p className="text-sm text-gray-500">{helps.contact}</p>
          </div>

          {/* Status Badge */}
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold 
              ${helps.status === "Pending" && "bg-yellow-100 text-yellow-700"}
              ${helps.status === "Verified" && "bg-blue-100 text-blue-700"}
              ${helps.status === "Assigned" && "bg-purple-100 text-purple-700"}
              ${helps.status === "Completed" && "bg-green-100 text-green-700"}
              ${helps.status === "Rejected" && "bg-red-100 text-red-700"}`}
          >
            {helps.status}
          </span>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-4">
            <InfoItem label="Help Type" value={helps.helpType} />
            <InfoItem label="Location" value={helps.location} />
            <InfoItem label="Family Members" value={helps.familyMembers} />
            <InfoItem label="Injured Count" value={helps.injuredCount} />
            <InfoItem label="Elderly or Children" value={helps.elderlyOrChildren} />
            <InfoItem label="Urgent Needs" value={helps.urgentNeeds} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <InfoItem label="Network Status" value={helps.networkStatus} />
            <InfoItem label="Submitted By" value={helps.submittedBy?.name} />
            <InfoItem label="Submitter Email" value={helps.submittedBy?.email} />
            <InfoItem label="Timestamp" value={new Date(helps.timestamp).toLocaleString()} />
            <InfoItem label="Date" value={new Date(helps.date).toLocaleString()} />
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="bg-gray-50 p-4 rounded-xl border text-gray-700">
            {helps.description || "No description provided."}
          </p>
        </div>

        {/* Additional Notes */}
        {helps.additionalNotes && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Additional Notes</h4>
            <p className="bg-gray-50 p-4 rounded-xl border text-gray-700">
              {helps.additionalNotes}
            </p>
          </div>
        )}

        {/* Coordinates */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Coordinates</h4>
          <p className="bg-gray-50 p-4 rounded-xl border text-gray-700">
            Latitude: {helps.coordinates?.lat} <br />
            Longitude: {helps.coordinates?.lng}
          </p>
        </div>

      </div>
  </div>
);

};

export default RequestDetails;