function CostEstimateCard({ estimate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        Cost to Full Charge
      </h2>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {estimate ? `${Math.round(estimate.estimatedCost).toLocaleString()} MMK` : 'N/A'}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {estimate ? `at ${Math.round(estimate.pricePerKwh).toLocaleString()} MMK/kWh` : 'No nearby station found'}
      </p>
    </div>
  );
}

export default CostEstimateCard;
