import request from 'supertest';
import bcrypt from 'bcryptjs';
import { __verifyIdToken as mockVerifyIdToken } from 'google-auth-library';
import app from '../src/app.js';
import User from '../src/models/user.model.js';
import * as userRepository from '../src/repositories/user.repository.js';
import { connectTestDb, clearTestDb, disconnectTestDb } from './setup/testDb.js';

jest.mock('google-auth-library', () => {
  const verifyIdToken = jest.fn();
  return {
    OAuth2Client: jest.fn().mockImplementation(() => ({ verifyIdToken })),
    __verifyIdToken: verifyIdToken,
  };
});

function mockGooglePayload(payload) {
  mockVerifyIdToken.mockResolvedValueOnce({ getPayload: () => payload });
}

beforeAll(async () => {
  await connectTestDb();
});

afterEach(async () => {
  await clearTestDb();
  mockVerifyIdToken.mockReset();
});

afterAll(async () => {
  await disconnectTestDb();
});

describe('POST /api/auth/google', () => {
  it('creates a new user when no account matches the Google id or email', async () => {
    mockGooglePayload({ sub: 'google-new-123', email: 'newgoogle@example.com', name: 'New Googler' });

    const res = await request(app).post('/api/auth/google').send({ idToken: 'fake-token' });
    console.log('google login (new user) response:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('newgoogle@example.com');

    const stored = await User.findOne({ email: 'newgoogle@example.com' });
    expect(stored.googleId).toBe('google-new-123');
    expect(stored.passwordHash).toBeUndefined();
  });

  it('links Google to an existing password account with the same email', async () => {
    await userRepository.create({
      name: 'Existing Password User',
      email: 'linkme@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
    });

    mockGooglePayload({ sub: 'google-link-456', email: 'linkme@example.com', name: 'Existing Password User' });

    const res = await request(app).post('/api/auth/google').send({ idToken: 'fake-token' });
    console.log('google login (link existing) response:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe('linkme@example.com');

    const stored = await User.findOne({ email: 'linkme@example.com' });
    expect(stored.googleId).toBe('google-link-456');
    expect(stored.passwordHash).toBeDefined();
  });

  it('logs in an existing user by googleId without creating a duplicate', async () => {
    const existing = await userRepository.createWithGoogle({
      name: 'Returning Googler',
      email: 'returning@example.com',
      googleId: 'google-existing-789',
    });

    mockGooglePayload({ sub: 'google-existing-789', email: 'returning@example.com', name: 'Returning Googler' });

    const res = await request(app).post('/api/auth/google').send({ idToken: 'fake-token' });
    console.log('google login (existing googleId) response:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.user.id).toBe(existing._id.toString());

    const count = await User.countDocuments({ email: 'returning@example.com' });
    expect(count).toBe(1);
  });

  it('rejects a password login attempt on a Google-only account', async () => {
    await userRepository.createWithGoogle({
      name: 'Google Only',
      email: 'googleonly@example.com',
      googleId: 'google-only-000',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'googleonly@example.com', password: 'whatever' });
    console.log('password login on google-only account response:', res.status, res.body);

    expect(res.status).toBe(401);
  });
});
