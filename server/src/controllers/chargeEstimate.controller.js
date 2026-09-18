import mongoose from 'mongoose';
import * as chargeEstimateService from '../services/chargeEstimate.service.js';

const DEFAULT_TARGET_PERCENT = 100;

export async function getEstimate(req, res) {
  const { carId, stationId } = req.query;
  const targetPercent =
    req.query.targetPercent !== undefined ? parseFloat(req.query.targetPercent) : DEFAULT_TARGET_PERCENT;

  if (!carId || !mongoose.isValidObjectId(carId)) {
    return res.status(400).json({ message: 'carId query param is required and must be a valid id' });
  }

  if (!stationId || !mongoose.isValidObjectId(stationId)) {
    return res.status(400).json({ message: 'stationId query param is required and must be a valid id' });
  }

  if (Number.isNaN(targetPercent) || targetPercent < 0 || targetPercent > 100) {
    return res.status(400).json({ message: 'targetPercent must be a number between 0 and 100' });
  }

  try {
    const estimate = await chargeEstimateService.getEstimate({
      userId: req.userId,
      carId,
      stationId,
      targetPercent,
    });
    res.status(200).json(estimate);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Failed to calculate charge estimate' });
  }
}
