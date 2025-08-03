import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch('http://localhost:5000/alertPanel')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
    const filterDate = filters.date ? filters.date : null;

    const matchType = filters.type ? item.type === filters.type : true;
    const matchSeverity = filters.severity ? item.severity === filters.severity : true;
    const matchDate = filterDate ? itemDate === filterDate : true;

    return matchType && matchSeverity && matchDate;
  });

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

      {/* Map Display */}
      <MapContainer center={[23.8103, 90.4125]} zoom={7} style={{ height: '600px', width: '100%' }}>
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
                  <strong>{item.type}</strong> <br />
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
