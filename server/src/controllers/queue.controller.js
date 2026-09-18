import mongoose from 'mongoose';
import * as queueService from '../services/queue.service.js';

function isValidStationId(stationId) {
  return mongoose.isValidObjectId(stationId);
}

export async function joinQueue(req, res) {
  const { stationId } = req.params;
  if (!isValidStationId(stationId)) {
    return res.status(400).json({ message: 'Invalid stationId' });
  }

  try {
    const status = await queueService.joinQueue(req.userId, stationId, req.body?.carId);
    res.status(200).json(status);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to join queue' });
  }
}

export async function leaveQueue(req, res) {
  const { stationId } = req.params;
  if (!isValidStationId(stationId)) {
    return res.status(400).json({ message: 'Invalid stationId' });
  }

  try {
    const status = await queueService.leaveQueue(req.userId, stationId);
    res.status(200).json(status);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to leave queue' });
  }
}

export async function getQueueStatus(req, res) {
  const { stationId } = req.params;
  if (!isValidStationId(stationId)) {
    return res.status(400).json({ message: 'Invalid stationId' });
  }

  try {
    const status = await queueService.getQueueStatus(req.userId, stationId);
    res.status(200).json(status);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to fetch queue status' });
  }
}
