import { apiFetch } from '../../../shared/lib/apiClient.js';

export function getHistory({ page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams({ page, limit });
  return apiFetch(`/api/charging-history?${params.toString()}`);
}
