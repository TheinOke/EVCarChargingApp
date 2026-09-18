function StationList({ stations }) {
  return (
    <div className="space-y-3">
      {stations.map((station) => (
        <div key={station.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{station.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{station.address}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {station.connectorTypes.join(', ')}
                {typeof station.distanceKm === 'number' ? ` · ${station.distanceKm.toFixed(1)} km away` : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">${station.pricePerKwh.toFixed(2)}/kWh</p>
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
      ))}
    </div>
  );
}

export default StationList;
