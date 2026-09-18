import ChargingHistoryRecord from '../models/chargingHistoryRecord.model.js';

export function countByUser(userId) {
  return ChargingHistoryRecord.countDocuments({ userId });
}

export function findPageByUser(userId, page, limit) {
  return ChargingHistoryRecord.find({ userId })
    .sort({ chargedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('carId')
    .populate('stationId');
}

export function insertMany(records) {
  return ChargingHistoryRecord.insertMany(records);
}
