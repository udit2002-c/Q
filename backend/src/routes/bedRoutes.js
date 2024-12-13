// bedRoutes.js
import { Router } from 'express';
import {
  createBed,
  updateBed,
  getAllBeds,
  getBedById,
  deleteBed,
  incrementBedCount,
  decrementBedCount
} from '../controllers/bedController.js';

const router = Router();

router.route('/create').post(createBed);
router.route('/update/:bedId').put(updateBed);
router.route('/all').get(getAllBeds);
router.route('/:bedId').get(getBedById);
router.route('/delete/:bedId').delete(deleteBed);
router.route('/increment').post(incrementBedCount);
router.route('/decrement').post(decrementBedCount);

export default router;