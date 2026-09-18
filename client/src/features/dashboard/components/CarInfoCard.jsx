function CarInfoCard({ car }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">My Car</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {car.make} {car.model}
      </p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">{car.batteryCapacityKwh} kWh battery capacity</p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">{car.connectorType} connector</p>
    </div>
  );
}

export default CarInfoCard;
