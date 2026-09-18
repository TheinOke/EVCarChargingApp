import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import carRoutes from './routes/car.routes.js';
import stationRoutes from './routes/station.routes.js';
import chargeEstimateRoutes from './routes/chargeEstimate.routes.js';
import chargingHistoryRoutes from './routes/chargingHistory.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/charge-estimate', chargeEstimateRoutes);
app.use('/api/charging-history', chargingHistoryRoutes);

export default app;
