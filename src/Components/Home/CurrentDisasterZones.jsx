import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';

// Custom icons for different severity levels
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getSeverityIcon = (severity) => {
  switch (severity) {
    case 'Severe':
      return redIcon;
    case 'Moderate':
      return orangeIcon;
    case 'High':
      return blueIcon;
    default:
      return blueIcon;
  }
};

const CurrentDisasterZones = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ type: '', severity: '', date: '' });
  const [zoomLevel, setZoomLevel] = useState(7); // default zoom
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('https://disaster-management-website-server.onrender.com/alertPanel')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
    const filterDate = filters.date || null;
    return (
      (!filters.type || item.type === filters.type) &&
      (!filters.severity || item.severity === filters.severity) &&
      (!filterDate || itemDate === filterDate)
    );
  });

  // Custom zoom handlers
  const handleZoomIn = () => {
    const map = mapRef.current;
    if (map) {
      const newZoom = map.getZoom() + 1;
      map.setZoom(newZoom);
      setZoomLevel(newZoom);
    }
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (map) {
      const newZoom = map.getZoom() - 1;
      map.setZoom(newZoom);
      setZoomLevel(newZoom);
    }
  };

  return (
    <div className="px-4 my-10 py-6">
      <h2 className="text-2xl font-bold mb-4">Interactive Disaster Map</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="Flood">Flood</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Fire">Fire</option>
          <option value="Drought">Drought</option>
          <option value="Building Collapse">Building Collapse</option>
          <option value="Heatwave">Heatwave</option>
          <option value="Landslide">Landslide</option>
          <option value="Lightning Storm">Lightning Storm</option>
          <option value="Tornado">Tornado</option>
        </select>

        <select onChange={e => setFilters(prev => ({ ...prev, severity: e.target.value }))} className="border p-2 rounded">
          <option value="">All Severities</option>
          <option value="Severe">Severe</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))}
          className="border p-2 rounded"
        />
      </div>

      {/* Zoom Controls */}
      {/* <div className="flex justify-end gap-2 mb-4">
        <button onClick={handleZoomIn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+</button>
        <button onClick={handleZoomOut} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">−</button>
      </div> */}

      {/* Map */}
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={zoomLevel}
        style={{ height: '600px', width: '100%' }}
        scrollWheelZoom={false}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredData.map((item, idx) => (
          item.coordinates?.lat && item.coordinates?.lng && (
            <Marker
              key={item._id || idx}
              position={[item.coordinates.lat, item.coordinates.lng]}
              icon={getSeverityIcon(item.severity)}
            >
              <Popup>
                <div>
                  <strong>{item.type}</strong><br />
                  {item.headline && <p className="font-semibold">{item.headline}</p>}
                  <p>Severity: {item.severity}</p>
                  <p>Location: {item.location}</p>
                  <p>Date: {format(new Date(item.timestamp), 'PPPpp')}</p>
                  {item.details && <p className="text-sm mt-1">{item.details}</p>}
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default CurrentDisasterZones;
