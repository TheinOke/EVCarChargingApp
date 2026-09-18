import User from '../models/user.model.js';

export function findByEmail(email) {
  return User.findOne({ email });
}

export function findById(id) {
  return User.findById(id);
}

export function create({ name, email, passwordHash }) {
  return User.create({ name, email, passwordHash });
}
