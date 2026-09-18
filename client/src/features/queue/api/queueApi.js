import { apiFetch } from '../../../shared/lib/apiClient.js';

export function join(stationId, carId) {
  return apiFetch(`/api/queue/${stationId}`, {
    method: 'POST',
    body: JSON.stringify(carId ? { carId } : {}),
  });
}

export function leave(stationId) {
  return apiFetch(`/api/queue/${stationId}`, { method: 'DELETE' });
}

export function getStatus(stationId) {
  return apiFetch(`/api/queue/${stationId}`);
}
