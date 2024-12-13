import { Router } from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctor.controller.js';

const router = Router();

router.route('/create').post(createDoctor);
router.route('/all').get(getAllDoctors);
router.route('/:id').get(getDoctorById);
router.route('/update/:id').put(updateDoctor);
router.route('/delete/:id').delete(deleteDoctor);

export default router; 