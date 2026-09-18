import * as carRepository from '../repositories/car.repository.js';

const MOCK_CAR_DEFAULTS = {
  make: 'Tesla',
  model: 'Model 3',
  batteryCapacityKwh: 60,
  currentBatteryPercent: 42,
  chargingPowerKw: 11,
};

export async function getOrCreateCarForUser(userId) {
  const existing = await carRepository.findByUserId(userId);
  if (existing) {
    return existing;
  }

  return carRepository.create(userId, MOCK_CAR_DEFAULTS);
}
