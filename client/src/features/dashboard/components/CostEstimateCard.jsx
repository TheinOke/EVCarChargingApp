function CostEstimateCard({ car }) {
  const remainingKwh = ((100 - car.currentBatteryPercent) / 100) * car.batteryCapacityKwh;
  const estimatedCost = remainingKwh * car.pricePerKwh;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Cost to Full Charge</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900">${estimatedCost.toFixed(2)}</p>
      <p className="mt-1 text-gray-500">at ${car.pricePerKwh.toFixed(2)}/kWh</p>
    </div>
  );
}

export default CostEstimateCard;
