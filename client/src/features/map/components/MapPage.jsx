import { mockStations } from './mockStations.js';
import StationMap from './StationMap.jsx';
import StationList from './StationList.jsx';

function MapPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nearby Charging Stations</h1>
      <StationMap stations={mockStations} />
      <div className="mt-6">
        <StationList stations={mockStations} />
      </div>
    </div>
  );
}

export default MapPage;
