import { useEffect, useState } from "react";
import { Truck, Users, PackageSearch } from "lucide-react";

const ResourceAllocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [helpRequests, setHelpRequests] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [rescuers, setRescuers] = useState([]);


  const [locations] = useState([
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Mymensingh"
  ]);

  const [dispatching, setDispatching] = useState(null);

  // ---------------- FETCH ALL DATA ----------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const [resourcesRes, requestHelpRes, alertPanelRes, rescuerRes] =
          await Promise.all([
            fetch(
              "https://disaster-management-website-server.onrender.com/resources"
            ),
            fetch(
              "https://disaster-management-website-server.onrender.com/requestHelps"
            ),
            fetch(
              "https://disaster-management-website-server.onrender.com/alertPanel"
            ),
            fetch(
              "https://disaster-management-website-server.onrender.com/rescuerProfile"
            ),
          ]);

        const resourcesData = await resourcesRes.json();
        const requestHelpData = await requestHelpRes.json();
        const alertPanelData = await alertPanelRes.json();
        const rescuerData = await rescuerRes.json();

        setData(resourcesData);
        setHelpRequests(requestHelpData);
        setAlerts(alertPanelData);
        setRescuers(rescuerData);
      } catch (error) {
        console.log("Failed loading:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // --------- Parse alerts globally ---------
  const parsedAlerts = alerts.map((a) => ({
    ...a,
    parsedResources: a.requiredResources
      ? a.requiredResources
          .split(/ {2,}|,/) // split by 2+ spaces OR comma
          .map((r) => r.trim())
          .filter(Boolean)
      : [],
  }));

  // -------- GET RESOURCE LOCATION STATUS ---------
  // Returns "Available" or "Dispatched" for a specific alert location
const findResourceLocations = (resourceName, alertLocation) => {
  const matches = data.filter(
    (res) => res.name?.toLowerCase().trim() === resourceName.toLowerCase().trim()
  );

  if (!matches.length) return "Not Available";

  // If any resource is dispatched to this location
  const dispatchedHere = matches.some((res) =>
    res.dispatches?.some((d) => d.location === alertLocation)
  );
  if (dispatchedHere) return "Dispatched";

  // If any resource is available (not dispatched anywhere)
  const availableHere = matches.some((res) => res.status === "available");
  if (availableHere) return "Available";

  return "Not Available";
};



  // --------- Badge color ---------
  const getStatusBadge = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      "in-use": "bg-yellow-100 text-yellow-800",
      dispatched: "bg-red-100 text-red-800",
      maintenance: "bg-gray-200 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // -------- Dispatch Logic ---------
  const handleDispatch = async (id, newLocation) => {
  if (!newLocation) return;
  setDispatching(id);

  const dispatchedAt = new Date().toISOString();

  try {
    // Send dispatch to backend
    await fetch(
      `https://disaster-management-website-server.onrender.com/resources/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newDispatch: { location: newLocation, dispatchedAt } }),
      }
    );

    // Update frontend state
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              dispatches: [...(item.dispatches || []), { location: newLocation, dispatchedAt }],
              selectedLocation: "",
            }
          : item
      )
    );
  } catch (err) {
    console.error(err);
  } finally {
    setDispatching(null);
  }
};


  // --------- Match resource to alert panel ---------
  const getAlertMatches = (resourceName) => {
  const matches = [];
  parsedAlerts.forEach((alert) => {
    alert.parsedResources.forEach((req) => {
      const reqWords = req.toLowerCase().split(" ").filter(Boolean);
      const resWords = resourceName.toLowerCase().split(" ").filter(Boolean);
      // Check if any word matches
      const hasMatch = resWords.some((word) => reqWords.includes(word));
      if (hasMatch) {
        matches.push({ headline: alert.headline, location: alert.location });
      }
    });
  });
  return matches;
};

  // --------- Match resource to help requests ---------
  const getHelpMatches = (resourceName, type) => {
    return helpRequests
      .filter(
        (h) =>
          h.helpType?.toLowerCase().includes(resourceName.toLowerCase()) ||
          h.helpType?.toLowerCase().includes(type.toLowerCase())
      )
      .map((h) => ({ helpType: h.helpType, location: h.location }));
  };

  // --------- Group resources by type ---------
  const grouped = {
    vehicle: data.filter((item) => item.type === "vehicle"),
    team: data.filter((item) => item.type === "team"),
    supply: data.filter((item) => item.type === "supply"),
  };

  // -------- Render single resource card ---------
  const renderCard = (item) => {
    const alertMatches = getAlertMatches(item.name);
    const helpMatches = getHelpMatches(item.name, item.type);
   

    return (
      <div
        key={item._id}
        className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 p-4 border dark:border-zinc-700 rounded-xl shadow"
      >
        {/* Resource Header */}
        <div className="flex items-center gap-3 mb-3">
          {item.type === "vehicle" && <Truck className="text-blue-500" />}
          {item.type === "team" && <Users className="text-green-500" />}
          {item.type === "supply" && <PackageSearch className="text-orange-500" />}
          <h3 className="text-lg font-semibold">{item.name}</h3>
        </div>

        <p>
          <span className="font-semibold">Original Location:</span> {item.location}
        </p>
        <p className="text-sm text-gray-600">
  Status:{" "}
  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(item.status)}`}>
  {item.status}
</span>

</p>


        {item.capacity && <p><strong>Capacity:</strong> {item.capacity}</p>}
        {item.members && <p><strong>Members:</strong> {item.members}</p>}
        {item.specialty && <p><strong>Specialty:</strong> {item.specialty}</p>}
        {item.quantity && <p><strong>Quantity:</strong> {item.quantity}</p>}

        {/* Required Locations / Alerts */}
{/* Required Locations / Alerts */}
<div className="mt-4 p-3 bg-gray-100 dark:bg-zinc-700 rounded-lg border">
  <p className="font-bold text-gray-800 dark:text-gray-200 mb-1">🟧 Required In:</p>
  {alertMatches.length === 0 && helpMatches.length === 0 ? (
    <p className="text-sm text-gray-600 dark:text-gray-300">Not currently requested</p>
  ) : (
    <div className="space-y-1">
      {alertMatches.map((a, idx) => (
        <p key={idx} className="text-sm text-red-700 dark:text-red-300">
          • {a.location}{" "}
          <span className="text-xs">(Alert: {a.headline})</span> –{" "}
          <span className="font-semibold">
            {findResourceLocations(item.name, a.location)}
          </span>
        </p>
      ))}
      {helpMatches.map((h, idx) => (
        <p key={idx} className="text-sm text-blue-700 dark:text-blue-300">
          • {h.location}{" "}
          <span className="text-xs">(Help Request: {h.helpType})</span> –{" "}
          <span className="font-semibold">
            {findResourceLocations(item.name, h.location)}
          </span>
        </p>
      ))}
    </div>
  )}
</div>



        {/* Already Dispatched */}
       {item.dispatches?.length > 0 && (
  <div className="mb-2">
    <p className="font-semibold text-sm">Already Dispatched To:</p>
    {item.dispatches.map((d, i) => (
      <p key={i} className="text-sm text-gray-600">
        • {d.location} ({new Date(d.dispatchedAt).toLocaleDateString()})
      </p>
    ))}
  </div>
)}


        {/* Dispatch Section */}
        <div className="mt-3 space-y-2">
          <select
            value={item.selectedLocation || ""}
            onChange={(e) =>
              setData((prev) =>
                prev.map((i) =>
                  i._id === item._id ? { ...i, selectedLocation: e.target.value } : i
                )
              )
            }
            className="w-full px-3 py-1 border rounded dark:bg-zinc-700 bg-white"
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((loc) => (
              <option
                key={loc}
                value={loc}
                disabled={item.dispatches?.some((d) => d.location === loc)}
              >
                {loc}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleDispatch(item._id, item.selectedLocation)}
            disabled={!item.selectedLocation || dispatching === item._id}
            className="w-full py-1.5 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {dispatching === item._id ? "Dispatching..." : "Dispatch"}
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div className="py-10 text-center">Loading resources...</div>;

  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Resource Allocation Dashboard</h2>

      {/* Emergency Requirements */}
      <div className="bg-blue-50 dark:bg-zinc-900 p-5 rounded-xl shadow space-y-5">
        <h3 className="text-2xl font-bold text-blue-700">Emergency Requirements</h3>

        {/* Alert Panel Resources */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-xl font-semibold text-gray-700">Required Resources</h4>
          {parsedAlerts.map((alert) => (
            <div key={alert._id} className="mt-4 p-3 border bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-800">{alert.headline}</p>
              {alert.parsedResources.map((res, idx) => (
  <div key={idx} className="mt-2 p-2 bg-white rounded border shadow-sm">
    <p className="font-medium">{res}</p>
    <p className="text-sm text-gray-600">
      Status:{" "} 
      <span className="font-semibold">
        {findResourceLocations(res, alert.location)}
      </span>
    </p>
  </div>
))}

            </div>
          ))}
        </div>
      </div>

      {/* Resources Sections */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-blue-700">🚚 Vehicles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.vehicle.map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 text-green-700">👨‍🚒 Rescue Teams</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.team.map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 text-orange-700">📦 Supplies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.supply.map(renderCard)}
        </div>
      </section>
    </div>
  );
};

export default ResourceAllocation;
