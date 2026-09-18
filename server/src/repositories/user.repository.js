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

export function findByGoogleId(googleId) {
  return User.findOne({ googleId });
}

export function linkGoogleId(userId, googleId) {
  return User.findByIdAndUpdate(userId, { googleId }, { new: true });
}

export function createWithGoogle({ name, email, googleId }) {
  return User.create({ name, email, googleId });
}
