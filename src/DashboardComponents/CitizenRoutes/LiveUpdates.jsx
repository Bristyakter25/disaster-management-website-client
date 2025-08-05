import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LiveUpdates = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel")
      .then((res) => res.json())
      .then((alerts) => {
        setData(alerts);
        setFiltered(alerts);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    let result = [...data];
    if (locationFilter) {
      result = result.filter((alert) =>
        alert.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (severityFilter) {
      result = result.filter((alert) => alert.severity === severityFilter);
    }
    setFiltered(result);
  }, [locationFilter, severityFilter, data]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Live Incident Map</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <input
          type="text"
          placeholder="Filter by location"
          className="input bg-white dark:bg-black text-black dark:text-white input-bordered"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <select
          className="select bg-white dark:bg-black text-black dark:text-white select-bordered"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      {/* Map + Summary Panel */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map */}
        <div className="lg:w-2/3 h-[500px]">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={6.5}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
          >
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filtered.map((alert) => (
              <Marker
                key={alert._id}
                position={[alert.coordinates.lat, alert.coordinates.lng]}
              >
                <Popup maxWidth={300}>
                  <div>
                    <img
                      src={alert.image}
                      alt={alert.headline}
                      className="w-full h-32 object-cover mb-2 rounded"
                    />
                    <h3 className="font-bold text-lg">{alert.headline}</h3>
                    <p className="text-sm">{alert.location}</p>
                    <p className="text-sm">
                      <span className="font-semibold">Severity:</span> {alert.severity}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List View */}
        <div className="lg:w-1/3 h-[500px] overflow-y-auto p-2 dark:bg-[#280A3E] bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Incident Summary</h3>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No incidents found.</p>
          ) : (
            filtered.map((alert) => (
              <div key={alert._id} className="border-b pb-2 mb-2">
                <h4 className="font-bold my-3">{alert.headline}</h4>
                <p className="text-sm">{alert.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Severity: <span className="font-medium">{alert.severity}</span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveUpdates;
