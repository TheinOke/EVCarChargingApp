import * as carService from '../services/car.service.js';

function toPublicCar(car) {
  return {
    id: car._id,
    make: car.make,
    model: car.model,
    batteryCapacityKwh: car.batteryCapacityKwh,
    currentBatteryPercent: car.currentBatteryPercent,
    chargingPowerKw: car.chargingPowerKw,
  };
}

export async function getMyCar(req, res) {
  try {
    const car = await carService.getOrCreateCarForUser(req.userId);
    res.status(200).json({ car: toPublicCar(car) });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch car' });
  }
}
