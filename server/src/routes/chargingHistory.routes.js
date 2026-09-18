import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getHistory } from '../controllers/chargingHistory.controller.js';

const router = Router();

router.get('/', requireAuth, getHistory);

export default router;
