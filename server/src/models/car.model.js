import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    batteryCapacityKwh: { type: Number, required: true },
    currentBatteryPercent: { type: Number, required: true, min: 0, max: 100 },
    chargingPowerKw: { type: Number, required: true },
    connectorType: { type: String, enum: ['Type2', 'CCS', 'CHAdeMO'], required: true },
  },
  { timestamps: true }
);

carSchema.index({ userId: 1 });

export default mongoose.model('Car', carSchema);
