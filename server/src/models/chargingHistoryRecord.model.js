import mongoose from 'mongoose';

const chargingHistoryRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  chargedAt: { type: Date, required: true },
  kWhCharged: { type: Number, required: true },
  cost: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  startBatteryPercent: { type: Number, required: true },
  endBatteryPercent: { type: Number, required: true },
});

chargingHistoryRecordSchema.index({ userId: 1, chargedAt: -1 });

export default mongoose.model('ChargingHistoryRecord', chargingHistoryRecordSchema);
