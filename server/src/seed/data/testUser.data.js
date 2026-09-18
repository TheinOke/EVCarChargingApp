export const MOCK_CAR_DEFAULTS = {
  make: 'Tesla',
  model: 'Model 3',
  batteryCapacityKwh: 60,
  currentBatteryPercent: 42,
  chargingPowerKw: 11,
  connectorType: 'CCS',
};

const SECOND_MOCK_CAR = {
  make: 'Nissan',
  model: 'Leaf',
  batteryCapacityKwh: 40,
  currentBatteryPercent: 68,
  chargingPowerKw: 6.6,
  connectorType: 'CHAdeMO',
};

// Multiple cars for the test user, to exercise multi-car scenarios (selection UI, etc.)
export const TEST_USER_CARS = [MOCK_CAR_DEFAULTS, SECOND_MOCK_CAR];

export const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  car: MOCK_CAR_DEFAULTS,
};
