import { formatOperatingHours } from '../lib/operatingHours.js';

function StationList({ stations, highlightConnectorType, selectedStationId, onSelectStation }) {
  return (
    <div className="space-y-3">
      {stations.map((station) => {
        const isCompatible =
          highlightConnectorType &&
          highlightConnectorType !== 'All types' &&
          station.connectorTypes.includes(highlightConnectorType);
        const isSelected = station.id === selectedStationId;

        return (
          <div
            key={station.id}
            onClick={() => onSelectStation?.(station)}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:ring-2 hover:ring-gray-900 dark:hover:ring-white ${
              isSelected ? 'ring-2 ring-teal-600' : ''
            }`}
          >
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                  {station.name}
                  {isCompatible && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      Compatible
                    </span>
                  )}
                  {isSelected && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                      Route shown
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{station.address}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {station.township} &middot; {station.connectorTypes.join(', ')}
                  {typeof station.distanceKm === 'number' ? ` · ${station.distanceKm.toFixed(1)} km away` : ''}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatOperatingHours(station.operatingHours)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-900 dark:text-white">{Math.round(station.pricePerKwh).toLocaleString()} MMK/kWh</p>
                <p
                  className={`text-sm ${
                    station.availablePorts === 0 ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {station.availablePorts}/{station.totalPorts} available
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StationList;
