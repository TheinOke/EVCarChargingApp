import { apiFetch } from '../../../shared/lib/apiClient.js';

export function findNearby({ lat, lng, radiusKm, all }) {
  const params = new URLSearchParams({ lat, lng });
  if (all) {
    params.set('all', 'true');
  } else if (radiusKm !== undefined) {
    params.set('radiusKm', radiusKm);
  }
  return apiFetch(`/api/stations?${params.toString()}`).then((data) => data.stations);
}
