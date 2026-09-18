import * as carRepository from '../repositories/car.repository.js';
import * as stationRepository from '../repositories/station.repository.js';

export async function getEstimate({ userId, carId, stationId, targetPercent }) {
  const car = await carRepository.findById(carId);
  if (!car) {
    const err = new Error('Car not found');
    err.status = 404;
    throw err;
  }

  if (car.userId.toString() !== userId) {
    const err = new Error('Not authorized to use this car');
    err.status = 403;
    throw err;
  }

  const station = await stationRepository.findById(stationId);
  if (!station) {
    const err = new Error('Station not found');
    err.status = 404;
    throw err;
  }

  const remainingKwh = Math.max(
    0,
    ((targetPercent - car.currentBatteryPercent) / 100) * car.batteryCapacityKwh
  );
  const estimatedHours = remainingKwh / car.chargingPowerKw;
  const estimatedCost = remainingKwh * station.pricePerKwh;

  return {
    carId: car._id,
    currentBatteryPercent: car.currentBatteryPercent,
    targetPercent,
    remainingKwh,
    estimatedHours,
    estimatedCost,
    pricePerKwh: station.pricePerKwh,
    stationId: station._id,
  };
}
