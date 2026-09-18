import * as carRepository from '../repositories/car.repository.js';
import { MOCK_CAR_DEFAULTS } from '../seed/data/testUser.data.js';

async function ensureAtLeastOneCar(userId) {
  const existing = await carRepository.findAllByUserId(userId);
  if (existing.length > 0) {
    return existing;
  }

  const created = await carRepository.create(userId, MOCK_CAR_DEFAULTS);
  return [created];
}

export async function listCarsForUser(userId) {
  return ensureAtLeastOneCar(userId);
}

export function createCar(userId, fields) {
  return carRepository.create(userId, fields);
}

export async function deleteCar(userId, carId) {
  const car = await carRepository.findById(carId);
  if (!car) {
    const err = new Error('Car not found');
    err.status = 404;
    throw err;
  }

  if (car.userId.toString() !== userId) {
    const err = new Error('Not authorized to delete this car');
    err.status = 403;
    throw err;
  }

  await carRepository.deleteById(carId);
}
