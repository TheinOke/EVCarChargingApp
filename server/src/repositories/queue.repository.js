import QueueEntry from '../models/queueEntry.model.js';

export function findByUserAndStation(userId, stationId) {
  return QueueEntry.findOne({ userId, stationId });
}

export function findByUser(userId) {
  return QueueEntry.find({ userId });
}

export function create(stationId, userId, carId) {
  return QueueEntry.create({ stationId, userId, carId });
}

export function deleteByUserAndStation(userId, stationId) {
  return QueueEntry.deleteOne({ userId, stationId });
}

export function deleteByUser(userId) {
  return QueueEntry.deleteMany({ userId });
}

export function countByStation(stationId) {
  return QueueEntry.countDocuments({ stationId });
}

export function countAllGroupedByStation() {
  return QueueEntry.aggregate([{ $group: { _id: '$stationId', count: { $sum: 1 } } }]);
}
