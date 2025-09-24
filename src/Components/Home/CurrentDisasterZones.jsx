import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';

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
  const [zoomLevel, setZoomLevel] = useState(7);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('https://disaster-management-website-server.vercel.app/alertPanel')
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

  return (
    <div className='my-10'>
       <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-28  text-gray-800 font-anton dark:text-white mb-7">Interactive Disaster Map</h2>
       <p className="text-center dark:text-white mb-16 text-gray-700 tracking-wider text-lg">
        An interactive disaster map designed to provide accurate, real-time information for analysis and decision-making.
      </p>
      <div className="flex flex-col  xl:flex-row gap-6 px-6  dark:bg-slate-900 bg-gray-100 py-16">
      
      {/* Details Panel */}
      <div className="xl:w-1/3  w-full space-y-6">
       

        {/* Filters Section */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Filter Alerts</h3>
          <select onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))} className="w-full border bg-white dark:bg-slate-900 p-2 rounded text-sm">
            <option value="">All Types</option>
            <option value="Flood">Flood</option>
            <option value="Cyclone">Cyclone</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Drought">Drought</option>
            <option value="Heatwave">Heatwave</option>
            <option value="Landslide">Landslide</option>
            <option value="Lightning Storm">Lightning Storm</option>
          </select>
          <select onChange={e => setFilters(prev => ({ ...prev, severity: e.target.value }))} className="w-full border bg-white dark:bg-slate-900 p-2 rounded text-sm">
            <option value="">All Severities</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Severe">Severe</option>
          </select>
          <input
            type="date"
            onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="w-full border p-2 bg-white dark:bg-slate-900 rounded text-sm"
          />
        </div>

        {/* Alerts List */}
        <div className="bg-white  dark:bg-slate-900 p-4 rounded-xl shadow-md max-h-[460px] overflow-y-auto space-y-3">
          <h3 className="text-lg  font-semibold dark:text-white text-gray-700 mb-2">Recent Alerts</h3>
          {filteredData.length === 0 ? (
            <p className="text-sm  text-gray-500 dark:text-white">No alerts found with current filters.</p>
          ) : (
            filteredData.slice(0, 8).map((item, idx) => (
              <div
                key={idx}
                className={`border-l-4 p-3 rounded-md shadow-sm bg-gray-50 hover:bg-white transition
                  ${item.severity === 'Severe' ? 'border-red-500' : item.severity === 'Moderate' ? 'border-orange-400' : 'border-blue-400'}`}
              >
                <h4 className="text-sm font-semibold text-gray-800">{item.type}</h4>
                <p className="text-xs text-gray-500">{format(new Date(item.timestamp), 'PPPpp')}</p>
                <p className="text-sm text-gray-600">{item.location}</p>
                {item.headline && <p className="text-xs italic text-gray-500 mt-1">{item.headline}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map Panel */}
      <div className="xl:w-2/3 mt-12 w-full">
        {/* <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Disaster Map</h2> */}
        <div className="w-full h-[650px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <MapContainer
  center={[23.8103, 90.4125]}
  zoom={zoomLevel}
  style={{ height: '100%', width: '100%' }}
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
      </div>
    </div>
    </div>
  );
};

export default CurrentDisasterZones;
