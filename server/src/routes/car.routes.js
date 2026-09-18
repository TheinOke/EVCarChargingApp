import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getMyCar } from '../controllers/car.controller.js';

const router = Router();

router.get('/me', requireAuth, getMyCar);

export default router;
