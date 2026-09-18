import Station from '../models/station.model.js';

export function countAll() {
  return Station.countDocuments();
}

export function insertMany(stations) {
  return Station.insertMany(stations);
}

export function findById(id) {
  return Station.findById(id);
}

export function findNear({ lat, lng, radiusKm }) {
  return Station.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng, lat] },
        distanceField: 'distanceMeters',
        maxDistance: radiusKm * 1000,
        spherical: true,
      },
    },
  ]);
}
