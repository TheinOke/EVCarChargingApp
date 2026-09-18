import * as chargingHistoryService from '../services/chargingHistory.service.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export async function getHistory(req, res) {
  const page = req.query.page !== undefined ? parseInt(req.query.page, 10) : DEFAULT_PAGE;
  const limit = req.query.limit !== undefined ? parseInt(req.query.limit, 10) : DEFAULT_LIMIT;

  if (Number.isNaN(page) || page < 1) {
    return res.status(400).json({ message: 'page must be a positive integer' });
  }
  if (Number.isNaN(limit) || limit < 1) {
    return res.status(400).json({ message: 'limit must be a positive integer' });
  }

  try {
    const result = await chargingHistoryService.getHistoryForUser(req.userId, page, limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch charging history' });
  }
}
