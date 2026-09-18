import { Link } from 'react-router-dom';
import { useChargingHistory } from '../hooks/useChargingHistory.js';
import HistoryList from './HistoryList.jsx';

function RecentHistoryCard() {
  const { records, status, error, retry } = useChargingHistory();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Charging History</h2>
        <Link to="/history" className="text-sm font-medium text-gray-900 dark:text-white underline">
          View more
        </Link>
      </div>

      {status === 'loading' && <p className="text-gray-500 dark:text-gray-400">Loading history...</p>}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Couldn't load history: {error}</p>
          <button onClick={retry} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
            Retry
          </button>
        </div>
      )}

      {status === 'success' && <HistoryList records={records} />}
    </div>
  );
}

export default RecentHistoryCard;
