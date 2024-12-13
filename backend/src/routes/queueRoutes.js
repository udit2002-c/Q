import { Router } from 'express';
import {
  addToQueue,
  removeFromQueue,
  getQueueStatus,
  getEstimatedWaitTime
} from '../controllers/queueController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/add', auth, addToQueue);
router.post('/remove', auth, removeFromQueue);
router.get('/status', auth, getQueueStatus);
router.get('/wait-time', auth, getEstimatedWaitTime);

export default router; 