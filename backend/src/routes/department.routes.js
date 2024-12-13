import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from '../controllers/department.controller.js';

const router = Router();

router.route('/create').post(createDepartment);
router.route('/all').get(getAllDepartments);
router.route('/:id').get(getDepartmentById);
router.route('/update/:id').put(updateDepartment);
router.route('/delete/:id').delete(deleteDepartment);

export default router; 