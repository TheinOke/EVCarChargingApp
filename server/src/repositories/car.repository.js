import Car from '../models/car.model.js';

export function findAllByUserId(userId) {
  return Car.find({ userId });
}

export function findById(id) {
  return Car.findById(id);
}

export function create(userId, fields) {
  return Car.create({ userId, ...fields });
}

export function deleteById(id) {
  return Car.findByIdAndDelete(id);
}
