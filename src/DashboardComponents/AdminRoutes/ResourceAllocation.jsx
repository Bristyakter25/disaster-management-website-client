import { useEffect, useState } from "react";
import { Truck, Users, PackageSearch } from "lucide-react";

const ResourceAllocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([
    "Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi"
  ]); // Sample locations
  const [dispatching, setDispatching] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/resources")
      .then((res) => res.json())
      .then((rawData) => {
        setData(rawData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const grouped = {
    vehicle: data.filter((item) => item.type === "vehicle"),
    team: data.filter((item) => item.type === "team"),
    supply: data.filter((item) => item.type === "supply"),
  };

  const getStatusBadge = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "in-use": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      dispatched: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      maintenance: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  const handleDispatch = async (id, newLocation) => {
  setDispatching(id);
  try {
    await fetch(`http://localhost:5000/resources/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "dispatched", location: newLocation }),
    });

    // Manually update local data to reflect dispatched status immediately
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, status: "dispatched", location: newLocation, selectedLocation: "" }
          : item
      )
    );
  } catch (error) {
    console.error("Failed to dispatch", error);
  } finally {
    setDispatching(null);
  }
};


  const renderCard = (item) => (
    <div
      key={item._id}
      className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-4 border dark:border-zinc-700 rounded-xl shadow hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3  mb-3">
        {item.type === "vehicle" && <Truck className="text-blue-500" />}
        {item.type === "team" && <Users className="text-green-500" />}
        {item.type === "supply" && <PackageSearch className="text-orange-500" />}
        <h3 className="text-lg font-semibold">{item.name}</h3>
      </div>

      <p className="text-[16px] mb-2"><span className="font-semibold">Location:</span> {item.location}</p>
      <p className="text-[16px] mb-2">
        <span className="font-semibold ">Status:</span>{" "}
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      </p>

      {item.capacity && <p className="text-[16px] mb-2"><span className="font-semibold">Capacity:</span> {item.capacity}</p>}
      {item.members && <p className="text-[16px] mb-2"><span className="font-semibold">Members:</span> {item.members}</p>}
      {item.specialty && <p className="text-[16px] mb-2"><span className="font-semibold">Specialty:</span> {item.specialty}</p>}
      {item.quantity && <p className="text-[16px] mb-2"><span className="font-semibold">Quantity:</span> {item.quantity}</p>}

      {/* Dispatch Section */}
      {/* Dispatch Section */}
{item.status !== "dispatched" && (
  <div className="mt-4 space-y-2 ">
    <select
      value={item.selectedLocation || ""}
      onChange={(e) => {
        const newLocation = e.target.value;
        setData(prev =>
          prev.map(i =>
            i._id === item._id ? { ...i, selectedLocation: newLocation } : i
          )
        );
      }}
      className="w-full px-3 py-1 rounded border bg-white dark:border-zinc-600 dark:bg-zinc-700"
    >
      <option className="bg-white dark:bg-black text-black dark:text-white" value="" disabled>Select Location</option>
      {locations.map((loc) => (
        <option className="bg-white dark:bg-black text-black dark:text-white" key={loc} value={loc}>{loc}</option>
      ))}
    </select>

    <button
      onClick={() => handleDispatch(item._id, item.selectedLocation)}
      disabled={!item.selectedLocation || dispatching === item._id}
      className="w-full py-1.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {dispatching === item._id ? "Dispatching..." : "Dispatch"}
    </button>
  </div>
)}

    </div>
  );

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600 dark:text-gray-300 font-semibold">
        Loading resources...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Resource Allocation Dashboard
      </h2>

      <section>
        <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">🚚 Vehicles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.vehicle.map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">👨‍🚒 Rescue Teams</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.team.map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">📦 Supplies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.supply.map(renderCard)}
        </div>
      </section>
    </div>
  );
};

export default ResourceAllocation;
