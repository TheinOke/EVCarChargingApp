import { useCallback, useEffect, useState } from 'react';
import * as stationsApi from '../api/stationsApi.js';
import { getCurrentCoords } from '../../../shared/lib/geolocation.js';

const DEFAULT_RADIUS_KM = 10;

export function useNearbyStations(radiusKm = DEFAULT_RADIUS_KM) {
  const [stations, setStations] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const coords = await getCurrentCoords();
      setUserCoords(coords);
      const result = await stationsApi.findNearby({ ...coords, radiusKm });
      setStations(result);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, [radiusKm]);

  useEffect(() => {
    load();
  }, [load]);

  return { stations, userCoords, radiusKm, status, error, retry: load };
}
