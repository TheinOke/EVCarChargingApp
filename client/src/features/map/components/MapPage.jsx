import { useMemo, useState } from 'react';
import { useNearbyStations } from '../hooks/useNearbyStations.js';
import { useRoute } from '../hooks/useRoute.js';
import { isOpenAt } from '../lib/operatingHours.js';
import { useActiveCar } from '../../cars/hooks/useActiveCar.jsx';
import StationMap from './StationMap.jsx';
import StationList from './StationList.jsx';

const TABS = [
  { key: 'nearby', label: 'Within 10km' },
  { key: 'all', label: 'All Stations' },
];

const CONNECTOR_OPTIONS = ['All types', 'Type2', 'CCS', 'CHAdeMO'];

function MapPage() {
  const { nearbyStations, allStations, userCoords, radiusKm, status, error, retry } = useNearbyStations();
  const { activeCar } = useActiveCar();
  const [tab, setTab] = useState('nearby');
  const [connectorType, setConnectorType] = useState(activeCar?.connectorType || 'All types');
  const [time, setTime] = useState('');
  const [township, setTownship] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);

  const { route, status: routeStatus, error: routeError } = useRoute(
    userCoords,
    selectedStation ? { lat: selectedStation.lat, lng: selectedStation.lng } : null
  );

  function selectStation(station) {
    setSelectedStation((prev) => (prev?.id === station.id ? null : station));
  }

  const baseStations = tab === 'nearby' ? nearbyStations : allStations;

  const displayedStations = useMemo(() => {
    return baseStations.filter((station) => {
      if (connectorType !== 'All types' && !station.connectorTypes.includes(connectorType)) {
        return false;
      }
      if (time && !isOpenAt(station.operatingHours, time)) {
        return false;
      }
      if (township && !station.township.toLowerCase().includes(township.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [baseStations, connectorType, time, township]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Nearby Charging Stations</h1>

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
          <div className="flex flex-wrap gap-2 mb-4">
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

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Connector type
              </label>
              <select
                value={connectorType}
                onChange={(e) => setConnectorType(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              >
                {CONNECTOR_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Available at
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Township
              </label>
              <input
                type="text"
                placeholder="e.g. Mayangone"
                value={township}
                onChange={(e) => setTownship(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              />
            </div>
          </div>

          {selectedStation && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              {routeStatus === 'loading' && (
                <span className="text-gray-500 dark:text-gray-400">
                  Finding route to {selectedStation.name}...
                </span>
              )}
              {routeStatus === 'error' && (
                <span className="text-red-600">{routeError}</span>
              )}
              {routeStatus === 'success' && route && (
                <span className="text-gray-700 dark:text-gray-300">
                  Route to <strong>{selectedStation.name}</strong>: {route.distanceKm.toFixed(1)} km &middot;{' '}
                  {Math.round(route.durationMin)} min
                </span>
              )}
              <button
                onClick={() => setSelectedStation(null)}
                className="text-gray-500 dark:text-gray-400 underline"
              >
                Clear route
              </button>
            </div>
          )}

          <StationMap
            stations={displayedStations}
            userCoords={userCoords}
            radiusKm={radiusKm}
            zoom={tab === 'nearby' ? 13 : 6}
            showRadiusCircle={tab === 'nearby'}
            route={route}
          />
          <div className="mt-6">
            <StationList
              stations={displayedStations}
              highlightConnectorType={connectorType}
              selectedStationId={selectedStation?.id}
              onSelectStation={selectStation}
            />
          </div>
          {displayedStations.length === 0 && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No charging stations match your filters.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MapPage;
