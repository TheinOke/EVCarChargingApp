import { formatDate, formatDuration } from '../lib/format.js';

function HistoryList({ records }) {
  if (records.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No charging history yet.</p>;
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div key={record.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white">
                {record.car ? `${record.car.make} ${record.car.model}` : 'Unknown car'} &middot;{' '}
                {record.station ? record.station.name : 'Unknown station'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(record.chargedAt)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {record.startBatteryPercent}% &rarr; {record.endBatteryPercent}% &middot; {record.kWhCharged} kWh &middot;{' '}
                {formatDuration(record.durationMinutes)}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white shrink-0">{record.cost.toLocaleString()} MMK</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryList;
