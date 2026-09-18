import * as carRepository from '../repositories/car.repository.js';

export function listCarsForUser(userId) {
  return carRepository.findAllByUserId(userId);
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
