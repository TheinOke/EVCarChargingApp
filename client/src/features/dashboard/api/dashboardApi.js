import { apiFetch } from '../../../shared/lib/apiClient.js';

export function getChargeEstimate({ carId, stationId }) {
  const params = new URLSearchParams({ carId, stationId });
  return apiFetch(`/api/charge-estimate?${params.toString()}`);
}
