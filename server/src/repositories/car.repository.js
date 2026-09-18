import Car from '../models/car.model.js';

export function findByUserId(userId) {
  return Car.findOne({ userId });
}

export function create(userId, fields) {
  return Car.create({ userId, ...fields });
}
