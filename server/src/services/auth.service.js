import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import * as userRepository from '../repositories/user.repository.js';

const SALT_ROUNDS = 10;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  if (!user.passwordHash) {
    const err = new Error('This account uses Google sign-in. Please continue with Google.');
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

export async function loginWithGoogle(idToken) {
  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    const err = new Error('Invalid Google token');
    err.status = 401;
    throw err;
  }

  const { sub: googleId, email, name } = payload;

  let user = await userRepository.findByGoogleId(googleId);

  if (!user) {
    user = await userRepository.findByEmail(email);
    if (user) {
      user = await userRepository.linkGoogleId(user._id, googleId);
    } else {
      user = await userRepository.createWithGoogle({ name, email, googleId });
    }
  }

  const token = signToken(user._id);

  return { user: toPublicUser(user), token };
}
