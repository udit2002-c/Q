import { asyncHandler } from '../utils/asyncHandler.js';
import InventoryItem from '../models/inventoryItemSchema.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// Create inventory item
export const createInventoryItem = asyncHandler(async (req, res) => {
  const { hospital_id, category, name, description, stock_quantity, last_refill_date, expiry_date } = req.body;

  if (!hospital_id || !category || !name || !description || !stock_quantity || !last_refill_date) {
    throw new ApiError(400, 'All required fields must be provided');
  }

  if (!mongoose.Types.ObjectId.isValid(hospital_id)) {
    throw new ApiError(400, 'Invalid hospital ID format');
  }

  const item = await InventoryItem.create({
    hospital_id,
    category,
    name,
    description,
    stock_quantity,
    last_refill_date,
    expiry_date
  });

  return res.status(201).json(
    new ApiResponse(201, 'Inventory item created successfully', item)
  );
});

// Update inventory item
export const updateInventoryItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, 'Invalid item ID format');
  }

  const item = await InventoryItem.findByIdAndUpdate(
    itemId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!item) {
    throw new ApiError(404, 'Inventory item not found');
  }

  return res.status(200).json(
    new ApiResponse(200, 'Inventory item updated successfully', item)
  );
});

// Get all inventory items
export const getAllInventoryItems = asyncHandler(async (req, res) => {
  const items = await InventoryItem.find()
    .populate('hospital_id', 'name location');

  return res.status(200).json(
    new ApiResponse(200, 'Inventory items fetched successfully', items)
  );
});

// Get inventory item by ID
export const getInventoryItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, 'Invalid item ID format');
  }

  const item = await InventoryItem.findById(itemId)
    .populate('hospital_id', 'name location');

  if (!item) {
    throw new ApiError(404, 'Inventory item not found');
  }

  return res.status(200).json(
    new ApiResponse(200, 'Inventory item fetched successfully', item)
  );
});

// Delete inventory item
export const deleteInventoryItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, 'Invalid item ID format');
  }

  const item = await InventoryItem.findByIdAndDelete(itemId);

  if (!item) {
    throw new ApiError(404, 'Inventory item not found');
  }

  return res.status(200).json(
    new ApiResponse(200, 'Inventory item deleted successfully', null)
  );
});