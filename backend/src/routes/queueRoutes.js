import express from 'express';
import { addToQueue, getQueueStatus, completeOPD } from '../controllers/queueController.js';

const router = express.Router();

router.post('/add', addToQueue);
router.get('/status', getQueueStatus);
router.post('/complete', completeOPD);

export default router;
