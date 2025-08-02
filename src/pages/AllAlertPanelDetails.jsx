import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AllAlertPanelDetails = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/alertPanel/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch alert details");
        return res.json();
      })
      .then((data) => {
        setAlert(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load alert details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading alert details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{alert.type}</h2>
      <img src={alert.image} alt={alert.type} className="w-full mb-4 rounded" />
      <button className="btn bg-gray-200 dark:bg-black text-black dark:text-white px-10">{alert.location}</button>
      <p className="font-bold text-2xl my-5">{alert.headline} </p>
      <p className="my-10">{alert.description}</p>
      <p><strong>Year:</strong> {alert.year}</p>
      <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
      <p className="mt-3">{alert.details}</p>
    </div>
  );
};

export default AllAlertPanelDetails;
