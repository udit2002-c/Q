// inventoryRoutes.js
import { Router } from 'express';
import {
  createInventoryItem,
  updateInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  deleteInventoryItem
} from '../controllers/inventoryController.js';

const router = Router();

router.route('/create').post(createInventoryItem);
router.route('/update/:itemId').put(updateInventoryItem);
router.route('/all').get(getAllInventoryItems);
router.route('/:itemId').get(getInventoryItemById);
router.route('/delete/:itemId').delete(deleteInventoryItem);

export default router;