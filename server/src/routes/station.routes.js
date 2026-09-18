import { Router } from 'express';
import { getNearbyStations } from '../controllers/station.controller.js';

const router = Router();

router.get('/', getNearbyStations);

export default router;
