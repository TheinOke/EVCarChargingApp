// Coordinates approximate Pyay Rd / Mayangone Township, Yangon (near Frontiir HQ,
// 33 Pyay Rd) for local testing of "nearby stations" — not pinpoint-accurate to
// the exact building, per the approximate coords the user confirmed using.
export const MOCK_STATIONS = [
  {
    name: 'Pyay Road Charge Hub',
    address: '33 Pyay Rd, Mayangone Township, Yangon',
    location: { type: 'Point', coordinates: [96.145, 16.86] },
    connectorTypes: ['Type2', 'CCS'],
    pricePerKwh: 0.32,
    totalPorts: 6,
    availablePorts: 3,
  },
  {
    name: 'Mayangone EV Station',
    address: 'Ward 5, Mayangone Township, Yangon',
    location: { type: 'Point', coordinates: [96.1495, 16.863] },
    connectorTypes: ['CCS'],
    pricePerKwh: 0.29,
    totalPorts: 4,
    availablePorts: 1,
  },
  {
    name: 'Myaynigone Power Point',
    address: 'Myaynigone Junction, Yangon',
    location: { type: 'Point', coordinates: [96.14, 16.855] },
    connectorTypes: ['Type2', 'CHAdeMO'],
    pricePerKwh: 0.35,
    totalPorts: 8,
    availablePorts: 5,
  },
  {
    name: 'Kamayut Fast Charge',
    address: 'Kamayut Township, Yangon',
    location: { type: 'Point', coordinates: [96.135, 16.85] },
    connectorTypes: ['CCS'],
    pricePerKwh: 0.4,
    totalPorts: 2,
    availablePorts: 0,
  },
];
