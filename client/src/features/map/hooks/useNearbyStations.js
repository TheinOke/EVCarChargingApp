import { useCallback, useEffect, useState } from 'react';
import * as stationsApi from '../api/stationsApi.js';
import { getCurrentCoords } from '../../../shared/lib/geolocation.js';

const NEARBY_RADIUS_KM = 10;

export function useNearbyStations() {
  const [allStations, setAllStations] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const coords = await getCurrentCoords();
      setUserCoords(coords);
      const result = await stationsApi.findNearby({ ...coords, all: true });
      setAllStations(result);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nearbyStations = allStations.filter((s) => s.distanceKm <= NEARBY_RADIUS_KM);

  return {
    allStations,
    nearbyStations,
    radiusKm: NEARBY_RADIUS_KM,
    userCoords,
    status,
    error,
    retry: load,
  };
}
