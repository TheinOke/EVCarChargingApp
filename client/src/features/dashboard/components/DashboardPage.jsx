import { useDashboardData } from '../hooks/useDashboardData.js';
import CarInfoCard from './CarInfoCard.jsx';
import BatteryStatusCard from './BatteryStatusCard.jsx';
import CostEstimateCard from './CostEstimateCard.jsx';

function DashboardPage() {
  const { car, estimate, status, error, retry } = useDashboardData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      {status === 'loading' && <p className="text-gray-500 dark:text-gray-400">Loading your car data...</p>}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Couldn't load dashboard data: {error}</p>
          <button
            onClick={retry}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && car && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CarInfoCard car={car} />
          <BatteryStatusCard car={car} estimate={estimate} />
          <CostEstimateCard estimate={estimate} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
