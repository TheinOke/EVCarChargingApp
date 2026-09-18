function CarInfoCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Car</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {car.make} {car.model}
      </p>
      <p className="mt-1 text-gray-500">{car.batteryCapacityKwh} kWh battery capacity</p>
    </div>
  );
}

export default CarInfoCard;
