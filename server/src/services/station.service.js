import * as stationRepository from '../repositories/station.repository.js';
import * as queueRepository from '../repositories/queue.repository.js';
import { MOCK_STATIONS } from '../seed/data/stations.data.js';

async function ensureSeeded() {
  const count = await stationRepository.countAll();
  if (count === 0) {
    await stationRepository.insertMany(MOCK_STATIONS);
  }
}

function toPublicStation(station, queueCountByStationId) {
  return {
    id: station._id,
    name: station.name,
    address: station.address,
    township: station.township,
    operatingHours: station.operatingHours,
    lat: station.location.coordinates[1],
    lng: station.location.coordinates[0],
    connectorTypes: station.connectorTypes,
    pricePerKwh: station.pricePerKwh,
    totalPorts: station.totalPorts,
    availablePorts: station.availablePorts,
    distanceKm: station.distanceMeters / 1000,
    queueCount: queueCountByStationId.get(station._id.toString()) || 0,
  };
}

export async function getNearbyStations({ lat, lng, radiusKm }) {
  await ensureSeeded();
  const [stations, queueCounts] = await Promise.all([
    stationRepository.findNear({ lat, lng, radiusKm }),
    queueRepository.countAllGroupedByStation(),
  ]);

  const queueCountByStationId = new Map(queueCounts.map((entry) => [entry._id.toString(), entry.count]));

  return stations.map((station) => toPublicStation(station, queueCountByStationId));
}
