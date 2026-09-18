import mongoose from 'mongoose';

const queueEntrySchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  joinedAt: { type: Date, default: Date.now },
});

queueEntrySchema.index({ stationId: 1, userId: 1 }, { unique: true });

export default mongoose.model('QueueEntry', queueEntrySchema);
