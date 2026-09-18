import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true, default: 'Point' },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    connectorTypes: { type: [String], required: true },
    pricePerKwh: { type: Number, required: true },
    totalPorts: { type: Number, required: true },
    availablePorts: { type: Number, required: true },
  },
  { timestamps: true }
);

stationSchema.index({ location: '2dsphere' });

export default mongoose.model('Station', stationSchema);
