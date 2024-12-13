import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import Department from '../models/departmentSchema.js';

// Create department
export const createDepartment = asyncHandler(async (req, res) => {
  const { name, hospital_id } = req.body;

  if (!name?.trim() || !hospital_id) {
    throw new ApiError(400, 'Name and hospital_id are required fields');
  }

  if (!mongoose.Types.ObjectId.isValid(hospital_id)) {
    throw new ApiError(400, 'Invalid hospital ID format');
  }

  const department = await Department.create({
    name: name.trim(),
    hospital_id,
  });

  return res.status(201).json(new ApiResponse(201, 'Department created successfully', department));
});

// Get all departments
export const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate('hospital_id', 'name').lean();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Departments fetched successfully', departments));
});

// Get department by ID
export const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid department ID format');
  }

  const department = await Department.findById(id).populate('hospital_id', 'name').lean();

  if (!department) {
    throw new ApiError(404, 'Department not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Department fetched successfully', department));
});

// Update department
export const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, hospital_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid department ID format');
  }

  if (hospital_id && !mongoose.Types.ObjectId.isValid(hospital_id)) {
    throw new ApiError(400, 'Invalid hospital ID format');
  }

  const department = await Department.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name?.trim(),
        hospital_id,
      },
    },
    { new: true, runValidators: true }
  );

  if (!department) {
    throw new ApiError(404, 'Department not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Department updated successfully', department));
});

// Delete department
export const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid department ID format');
  }

  const department = await Department.findByIdAndDelete(id);

  if (!department) {
    throw new ApiError(404, 'Department not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Department deleted successfully', {}));
});
