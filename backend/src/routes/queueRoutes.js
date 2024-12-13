import express from 'express';
import { 
  addToQueue, 
  getNextInQueue, 
  getQueuesByPatient,
  processNextInQueue 
} from '../controllers/queueController';

const router = express.Router();

router.post('/add', addToQueue);
router.get('/next/:hospital_id', getNextInQueue);
router.get('/patient/:patient_account', getQueuesByPatient);
router.post('/process/:hospital_id', processNextInQueue);

export default router;
