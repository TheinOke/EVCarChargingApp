import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

export function useRoute(from, to) {
  const [route, setRoute] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!from || !to) {
      setRoute(null);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    setError(null);

    const router = L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' });
    let cancelled = false;

    router.route(
      [L.Routing.waypoint(L.latLng(from.lat, from.lng)), L.Routing.waypoint(L.latLng(to.lat, to.lng))],
      (err, routes) => {
        if (cancelled) return;

        if (err || !routes || routes.length === 0) {
          setError('Could not find a route');
          setStatus('error');
          setRoute(null);
          return;
        }

        const best = routes[0];
        setRoute({
          coordinates: best.coordinates.map((c) => [c.lat, c.lng]),
          distanceKm: best.summary.totalDistance / 1000,
          durationMin: best.summary.totalTime / 60,
        });
        setStatus('success');
      }
    );

    return () => {
      cancelled = true;
    };
  }, [from?.lat, from?.lng, to?.lat, to?.lng]);

  return { route, status, error };
}
