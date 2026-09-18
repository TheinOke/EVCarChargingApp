export function isOpenAt(operatingHours, timeStr) {
  if (!operatingHours || !timeStr) {
    return true;
  }
  if (operatingHours.open24h) {
    return true;
  }
  const { openTime, closeTime } = operatingHours;
  if (!openTime || !closeTime) {
    return true;
  }
  // "HH:MM" strings compare correctly lexicographically for same-day ranges.
  return timeStr >= openTime && timeStr <= closeTime;
}

export function formatOperatingHours(operatingHours) {
  if (!operatingHours) {
    return 'Hours unknown';
  }
  if (operatingHours.open24h) {
    return '24 hours';
  }
  if (operatingHours.openTime && operatingHours.closeTime) {
    return `${operatingHours.openTime}–${operatingHours.closeTime}`;
  }
  return 'Hours unknown';
}
