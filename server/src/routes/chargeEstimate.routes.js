import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getEstimate } from '../controllers/chargeEstimate.controller.js';

const router = Router();

router.get('/', requireAuth, getEstimate);

export default router;
