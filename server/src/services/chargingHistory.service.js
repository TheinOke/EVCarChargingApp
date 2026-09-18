import * as chargingHistoryRepository from '../repositories/chargingHistory.repository.js';
import * as carRepository from '../repositories/car.repository.js';
import * as stationRepository from '../repositories/station.repository.js';
import { ensureSeeded as ensureStationsSeeded } from './station.service.js';

const MOCK_RECORD_COUNT = 24;
const DAYS_SPAN = 30;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

async function ensureSeeded(userId) {
  const existingCount = await chargingHistoryRepository.countByUser(userId);
  if (existingCount > 0) {
    return;
  }

  const cars = await carRepository.findAllByUserId(userId);
  if (cars.length === 0) {
    return;
  }

  await ensureStationsSeeded();
  const stations = await stationRepository.findAll();
  if (stations.length === 0) {
    return;
  }

  const now = Date.now();
  const records = [];

  for (let i = 0; i < MOCK_RECORD_COUNT; i++) {
    const car = randomItem(cars);
    const station = randomItem(stations);
    const startBatteryPercent = randomInt(10, 60);
    const endBatteryPercent = randomInt(startBatteryPercent + 10, 100);
    const kWhCharged =
      Math.round(((endBatteryPercent - startBatteryPercent) / 100) * car.batteryCapacityKwh * 10) / 10;
    const durationMinutes = Math.round((kWhCharged / car.chargingPowerKw) * 60);
    const cost = Math.round(kWhCharged * station.pricePerKwh);
    const chargedAt = new Date(now - randomInt(0, DAYS_SPAN * 24 * 60 * 60 * 1000));

    records.push({
      userId,
      carId: car._id,
      stationId: station._id,
      chargedAt,
      kWhCharged,
      cost,
      durationMinutes,
      startBatteryPercent,
      endBatteryPercent,
    });
  }

  await chargingHistoryRepository.insertMany(records);
}

function toPublicRecord(record) {
  return {
    id: record._id,
    chargedAt: record.chargedAt,
    car: record.carId ? { make: record.carId.make, model: record.carId.model } : null,
    station: record.stationId ? { name: record.stationId.name, township: record.stationId.township } : null,
    kWhCharged: record.kWhCharged,
    cost: record.cost,
    durationMinutes: record.durationMinutes,
    startBatteryPercent: record.startBatteryPercent,
    endBatteryPercent: record.endBatteryPercent,
  };
}

export async function getHistoryForUser(userId, page, limit) {
  await ensureSeeded(userId);

  const [records, total] = await Promise.all([
    chargingHistoryRepository.findPageByUser(userId, page, limit),
    chargingHistoryRepository.countByUser(userId),
  ]);

  return {
    records: records.map(toPublicRecord),
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
