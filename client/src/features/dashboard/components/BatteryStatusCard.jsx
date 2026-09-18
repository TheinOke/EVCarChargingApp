function BatteryStatusCard({ car, estimate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Battery</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{car.currentBatteryPercent}%</p>
      <div className="mt-3 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-3 rounded-full bg-green-500"
          style={{ width: `${car.currentBatteryPercent}%` }}
        />
      </div>
      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Estimated time to full:{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {estimate ? `${estimate.estimatedHours.toFixed(1)} hrs` : 'N/A'}
        </span>
      </p>
    </div>
  );
}

export default BatteryStatusCard;
