import { useState } from 'react';
import { useNearbyStations } from '../hooks/useNearbyStations.js';
import StationMap from './StationMap.jsx';
import StationList from './StationList.jsx';

const TABS = [
  { key: 'nearby', label: 'Within 10km' },
  { key: 'all', label: 'All Stations' },
];

function MapPage() {
  const { nearbyStations, allStations, userCoords, radiusKm, status, error, retry } = useNearbyStations();
  const [tab, setTab] = useState('nearby');

  const displayedStations = tab === 'nearby' ? nearbyStations : allStations;

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
          <div className="flex gap-2 mb-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  tab === t.key
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow'
                }`}
              >
                {t.label} ({t.key === 'nearby' ? nearbyStations.length : allStations.length})
              </button>
            ))}
          </div>

          <StationMap
            stations={displayedStations}
            userCoords={userCoords}
            radiusKm={radiusKm}
            zoom={tab === 'nearby' ? 13 : 6}
            showRadiusCircle={tab === 'nearby'}
          />
          <div className="mt-6">
            <StationList stations={displayedStations} />
          </div>
          {displayedStations.length === 0 && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {tab === 'nearby' ? 'No charging stations found within 10km.' : 'No charging stations found.'}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MapPage;
