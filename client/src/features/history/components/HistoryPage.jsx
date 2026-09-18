import { useChargingHistory } from '../hooks/useChargingHistory.js';
import HistoryList from './HistoryList.jsx';

function HistoryPage() {
  const { records, page, totalPages, status, error, goToPage, retry } = useChargingHistory();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Charging History</h1>

      {status === 'loading' && <p className="text-gray-500 dark:text-gray-400">Loading history...</p>}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Couldn't load history: {error}</p>
          <button onClick={retry} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <>
          <HistoryList records={records} />

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md shadow text-sm font-medium disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md shadow text-sm font-medium disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HistoryPage;
