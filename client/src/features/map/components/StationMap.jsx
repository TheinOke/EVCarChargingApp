import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { DEFAULT_COORDS } from '../../../shared/lib/geolocation.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function StationMap({ stations, userCoords, radiusKm }) {
  const center = userCoords
    ? [userCoords.lat, userCoords.lng]
    : stations.length > 0
      ? [stations[0].lat, stations[0].lng]
      : [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng];

  return (
    <MapContainer center={center} zoom={13} className="h-96 w-full rounded-lg shadow">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userCoords && (
        <>
          <CircleMarker
            center={[userCoords.lat, userCoords.lng]}
            radius={8}
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 1 }}
          >
            <Popup>You are here</Popup>
          </CircleMarker>
          {radiusKm && (
            <Circle
              center={[userCoords.lat, userCoords.lng]}
              radius={radiusKm * 1000}
              pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.08 }}
            />
          )}
        </>
      )}

      {stations.map((station) => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.address}
            <br />
            ${station.pricePerKwh.toFixed(2)}/kWh &middot; {station.availablePorts}/{station.totalPorts} ports available
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default StationMap;
