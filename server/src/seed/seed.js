import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import * as stationRepository from '../repositories/station.repository.js';
import * as userRepository from '../repositories/user.repository.js';
import * as carRepository from '../repositories/car.repository.js';
import { MOCK_STATIONS } from './data/stations.data.js';
import { TEST_USER, TEST_USER_CARS } from './data/testUser.data.js';

const SALT_ROUNDS = 10;

async function seedStations() {
  const count = await stationRepository.countAll();
  if (count > 0) {
    console.log(`Stations: already seeded (${count} existing) — skipped`);
    return;
  }

  await stationRepository.insertMany(MOCK_STATIONS);
  console.log(`Stations: inserted ${MOCK_STATIONS.length} mock stations`);
}

async function seedTestUser() {
  let user = await userRepository.findByEmail(TEST_USER.email);

  if (user) {
    console.log(`Test user: already exists (${TEST_USER.email})`);
  } else {
    const passwordHash = await bcrypt.hash(TEST_USER.password, SALT_ROUNDS);
    user = await userRepository.create({
      name: TEST_USER.name,
      email: TEST_USER.email,
      passwordHash,
    });
    console.log(`Test user: created ${TEST_USER.email}`);
  }

  const existingCars = await carRepository.findAllByUserId(user._id);
  const existingKey = (car) => `${car.make}::${car.model}`;
  const existingKeys = new Set(existingCars.map(existingKey));

  for (const carData of TEST_USER_CARS) {
    if (existingKeys.has(existingKey(carData))) {
      console.log(`Test user car: ${carData.make} ${carData.model} already exists — skipped`);
    } else {
      await carRepository.create(user._id, carData);
      console.log(`Test user car: created ${carData.make} ${carData.model}`);
    }
  }
}

async function run() {
  await connectDB(process.env.MONGO_URI);
  await seedStations();
  await seedTestUser();
  await mongoose.disconnect();
  console.log('Seeding complete.');
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
