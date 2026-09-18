import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function connectTestDb() {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
  process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

  mongoServer = await MongoMemoryServer.create({
    binary: { version: '7.0.14' },
  });
  await mongoose.connect(mongoServer.getUri());
}

export async function clearTestDb() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

export async function disconnectTestDb() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}
