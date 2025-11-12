import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';

// Marker icons
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
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

// Choose icon by helpType or status (customize if needed)
const getMarkerIcon = (status) => (status === 'Pending' ? redIcon : blueIcon);

const RequestHelpsMap = () => {
  const [requests, setRequests] = useState([]);
  const mapRef = useRef(null);

  // Fetch help requests
  useEffect(() => {
    fetch('https://disaster-management-website-server.onrender.com/requestHelps') // Replace with your API endpoint
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Error fetching requests:', err));
  }, []);

  return (
    <div className="px-4 md:px-10">
      <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-28 text-gray-800 dark:text-white mb-7">
        Real-Time Help Requests
      </h2>
      <p className="text-center dark:text-white mb-16 text-gray-700 tracking-wider text-lg">
        All submitted help requests are shown on the map below. Click a marker to see details.
      </p>

      <div className="w-full h-[650px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={[23.8103, 90.4125]} // Default to Dhaka
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {requests.map((request) => (
            request.coordinates?.lat && request.coordinates?.lng && (
              <Marker
                key={request._id}
                position={[request.coordinates.lat, request.coordinates.lng]}
                icon={getMarkerIcon(request.status)}
              >
                <Popup>
                  <div>
                    <p><strong>Name:</strong> {request.name}</p>
                    <p><strong>Help Type:</strong> {request.helpType}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Location:</strong> {request.location}</p>
                    <p><strong>Date:</strong> {format(new Date(request.date), 'PPPpp')}</p>
                    {request.description && <p className="text-sm mt-1">{request.description}</p>}
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RequestHelpsMap;
