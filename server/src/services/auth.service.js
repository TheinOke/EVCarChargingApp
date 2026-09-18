import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';

const SALT_ROUNDS = 10;

function signToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
}

function toPublicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

export async function signup({ name, email, password }) {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create({ name, email, passwordHash });
  const token = signToken(user._id);

  return { user: toPublicUser(user), token };
}

export async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = signToken(user._id);

  return { user: toPublicUser(user), token };
}
