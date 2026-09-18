function BatteryStatusCard({ car }) {
  const remainingKwh = ((100 - car.currentBatteryPercent) / 100) * car.batteryCapacityKwh;
  const hoursToFull = remainingKwh / car.chargingPowerKw;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Battery</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900">{car.currentBatteryPercent}%</p>
      <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-green-500"
          style={{ width: `${car.currentBatteryPercent}%` }}
        />
      </div>
      <p className="mt-3 text-gray-500">
        Estimated time to full: <span className="font-semibold text-gray-900">{hoursToFull.toFixed(1)} hrs</span>
      </p>
    </div>
  );
}

export default BatteryStatusCard;
