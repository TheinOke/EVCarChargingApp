import { useCallback, useEffect, useState } from 'react';
import * as dashboardApi from '../api/dashboardApi.js';
import * as stationsApi from '../../map/api/stationsApi.js';
import { getCurrentCoords } from '../../../shared/lib/geolocation.js';
import { useActiveCar } from '../../cars/hooks/useActiveCar.jsx';

export function useDashboardData() {
  const { activeCar } = useActiveCar();
  const [estimate, setEstimate] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!activeCar) {
      setError('No car selected');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);
    try {
      const coords = await getCurrentCoords();
      // Use the nearest station regardless of distance — stations are now spread
      // across multiple cities, so a fixed radius could miss the closest one.
      const nearbyStations = await stationsApi.findNearby({ ...coords, all: true });
      if (nearbyStations.length === 0) {
        setEstimate(null);
        setStatus('success');
        return;
      }

      const nearestStationId = nearbyStations[0].id;
      const chargeEstimate = await dashboardApi.getChargeEstimate({
        carId: activeCar.id,
        stationId: nearestStationId,
      });
      setEstimate(chargeEstimate);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, [activeCar]);

  useEffect(() => {
    load();
  }, [load]);

  return { car: activeCar, estimate, status, error, retry: load };
}
