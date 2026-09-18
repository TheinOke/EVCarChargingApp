import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { joinQueue, leaveQueue, getQueueStatus } from '../controllers/queue.controller.js';

const router = Router();

router.post('/:stationId', requireAuth, joinQueue);
router.delete('/:stationId', requireAuth, leaveQueue);
router.get('/:stationId', requireAuth, getQueueStatus);

export default router;
