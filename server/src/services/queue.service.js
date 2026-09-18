import * as queueRepository from '../repositories/queue.repository.js';
import * as stationRepository from '../repositories/station.repository.js';

export async function joinQueue(userId, stationId, carId) {
  const station = await stationRepository.findById(stationId);
  if (!station) {
    const err = new Error('Station not found');
    err.status = 404;
    throw err;
  }

  // A user can only be queueing at one station at a time.
  await queueRepository.deleteByUser(userId);
  await queueRepository.create(stationId, userId, carId);

  return getQueueStatus(userId, stationId);
}

export async function leaveQueue(userId, stationId) {
  await queueRepository.deleteByUserAndStation(userId, stationId);
  return getQueueStatus(userId, stationId);
}

export async function getQueueStatus(userId, stationId) {
  const [count, entry] = await Promise.all([
    queueRepository.countByStation(stationId),
    queueRepository.findByUserAndStation(userId, stationId),
  ]);

  return { count, isUserInQueue: !!entry };
}
