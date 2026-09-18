// Fallback: matches the mock stations seeded near Frontiir HQ (Pyay Rd, Mayangone, Yangon).
export const DEFAULT_COORDS = { lat: 16.86, lng: 96.145 };

export function getCurrentCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_COORDS);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        resolve(DEFAULT_COORDS);
      },
      { timeout: 5000 }
    );
  });
}
