import { apiFetch } from '../../../shared/lib/apiClient.js';

export function listCars() {
  return apiFetch('/api/cars').then((data) => data.cars);
}

export function createCar(fields) {
  return apiFetch('/api/cars', {
    method: 'POST',
    body: JSON.stringify(fields),
  }).then((data) => data.car);
}

export function deleteCar(id) {
  return apiFetch(`/api/cars/${id}`, { method: 'DELETE' });
}
