import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { listCars, createCar, deleteCar } from '../controllers/car.controller.js';

const router = Router();

router.get('/', requireAuth, listCars);
router.post('/', requireAuth, createCar);
router.delete('/:id', requireAuth, deleteCar);

export default router;
