import * as stationService from '../services/station.service.js';

const DEFAULT_RADIUS_KM = 10;

export async function getNearbyStations(req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const all = req.query.all === 'true';

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ message: 'lat and lng query params are required and must be numbers' });
  }

  let radiusKm;
  if (!all) {
    radiusKm = req.query.radiusKm !== undefined ? parseFloat(req.query.radiusKm) : DEFAULT_RADIUS_KM;
    if (Number.isNaN(radiusKm) || radiusKm <= 0) {
      return res.status(400).json({ message: 'radiusKm must be a positive number' });
    }
  }

  try {
    const stations = await stationService.getNearbyStations({ lat, lng, radiusKm });
    res.status(200).json({ stations });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch stations' });
  }
}
