import * as carService from '../services/car.service.js';

const REQUIRED_CAR_FIELDS = [
  'make',
  'model',
  'batteryCapacityKwh',
  'currentBatteryPercent',
  'chargingPowerKw',
  'connectorType',
];

function toPublicCar(car) {
  return {
    id: car._id,
    make: car.make,
    model: car.model,
    batteryCapacityKwh: car.batteryCapacityKwh,
    currentBatteryPercent: car.currentBatteryPercent,
    chargingPowerKw: car.chargingPowerKw,
    connectorType: car.connectorType,
  };
}

export async function listCars(req, res) {
  try {
    const cars = await carService.listCarsForUser(req.userId);
    res.status(200).json({ cars: cars.map(toPublicCar) });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch cars' });
  }
}

export async function createCar(req, res) {
  const missing = REQUIRED_CAR_FIELDS.filter((field) => req.body[field] === undefined);
  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  try {
    const car = await carService.createCar(req.userId, {
      make: req.body.make,
      model: req.body.model,
      batteryCapacityKwh: req.body.batteryCapacityKwh,
      currentBatteryPercent: req.body.currentBatteryPercent,
      chargingPowerKw: req.body.chargingPowerKw,
      connectorType: req.body.connectorType,
    });
    res.status(201).json({ car: toPublicCar(car) });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to create car' });
  }
}

export async function deleteCar(req, res) {
  try {
    await carService.deleteCar(req.userId, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to delete car' });
  }
}
