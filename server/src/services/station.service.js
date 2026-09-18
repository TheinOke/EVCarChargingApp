import * as stationRepository from '../repositories/station.repository.js';
import { MOCK_STATIONS } from '../seed/data/stations.data.js';

async function ensureSeeded() {
  const count = await stationRepository.countAll();
  if (count === 0) {
    await stationRepository.insertMany(MOCK_STATIONS);
  }
}

function toPublicStation(station) {
  return {
    id: station._id,
    name: station.name,
    address: station.address,
    lat: station.location.coordinates[1],
    lng: station.location.coordinates[0],
    connectorTypes: station.connectorTypes,
    pricePerKwh: station.pricePerKwh,
    totalPorts: station.totalPorts,
    availablePorts: station.availablePorts,
    distanceKm: station.distanceMeters / 1000,
  };
}

export async function getNearbyStations({ lat, lng, radiusKm }) {
  await ensureSeeded();
  const stations = await stationRepository.findNear({ lat, lng, radiusKm });
  return stations.map(toPublicStation);
}
