import { useNearbyStations } from '../hooks/useNearbyStations.js';
import StationMap from './StationMap.jsx';
import StationList from './StationList.jsx';

function MapPage() {
  const { stations, userCoords, radiusKm, status, error, retry } = useNearbyStations();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nearby Charging Stations</h1>

      {status === 'loading' && (
        <p className="text-gray-500 dark:text-gray-400">Locating you and finding nearby stations...</p>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Couldn't load nearby stations: {error}</p>
          <button
            onClick={retry}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <>
          <StationMap stations={stations} userCoords={userCoords} radiusKm={radiusKm} />
          <div className="mt-6">
            <StationList stations={stations} />
          </div>
          {stations.length === 0 && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">No charging stations found nearby.</p>
          )}
        </>
      )}
    </div>
  );
}

export default MapPage;
