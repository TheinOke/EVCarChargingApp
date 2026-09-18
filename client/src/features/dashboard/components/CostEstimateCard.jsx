function CostEstimateCard({ estimate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        Cost to Full Charge
      </h2>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {estimate ? `$${estimate.estimatedCost.toFixed(2)}` : 'N/A'}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {estimate ? `at $${estimate.pricePerKwh.toFixed(2)}/kWh` : 'No nearby station found'}
      </p>
    </div>
  );
}

export default CostEstimateCard;
