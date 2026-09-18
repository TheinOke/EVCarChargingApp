import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../src/app.js';
import User from '../src/models/user.model.js';
import * as userRepository from '../src/repositories/user.repository.js';
import { connectTestDb, clearTestDb, disconnectTestDb } from './setup/testDb.js';

beforeAll(async () => {
  await connectTestDb();
});

afterEach(async () => {
  await clearTestDb();
});

afterAll(async () => {
  await disconnectTestDb();
});

describe('POST /api/auth/signup', () => {
  it('creates a new user and returns a token', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Test User',
      email: 'signup@example.com',
      password: 'password123',
    });

    console.log('signup (new user) response:', res.status, res.body);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('signup@example.com');

    const stored = await User.findOne({ email: 'signup@example.com' });
    expect(stored).not.toBeNull();
    expect(stored.passwordHash).not.toBe('password123');
  });

  it('rejects signup with an email that already exists', async () => {
    await userRepository.create({
      name: 'Existing User',
      email: 'duplicate@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
    });

    const res = await request(app).post('/api/auth/signup').send({
      name: 'Another User',
      email: 'duplicate@example.com',
      password: 'password456',
    });

    console.log('signup (duplicate email) response:', res.status, res.body);

    expect(res.status).toBe(409);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await userRepository.create({
      name: 'Login User',
      email: 'login@example.com',
      passwordHash: await bcrypt.hash('correct-password', 10),
    });
  });

  it('logs in with correct credentials and returns a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'correct-password',
    });

    console.log('login (correct credentials) response:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('login@example.com');
  });

  it('rejects login with the wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'wrong-password',
    });

    console.log('login (wrong password) response:', res.status, res.body);

    expect(res.status).toBe(401);
  });

  it('rejects login for a non-existent email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nobody@example.com',
      password: 'whatever',
    });

    console.log('login (unknown email) response:', res.status, res.body);

    expect(res.status).toBe(401);
  });
});
