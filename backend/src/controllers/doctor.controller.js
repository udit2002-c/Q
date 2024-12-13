import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import Doctor from '../models/doctorSchema.js';

// Create doctor
export const createDoctor = asyncHandler(async (req, res) => {
  const { name, department_id, contact_number, date_of_birth, qualification, experience_years } =
    req.body;

  if (
    !name?.trim() ||
    !department_id ||
    !contact_number?.trim() ||
    !date_of_birth ||
    !qualification?.trim() ||
    !experience_years
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  if (!mongoose.Types.ObjectId.isValid(department_id)) {
    throw new ApiError(400, 'Invalid department ID format');
  }

  const doctor = await Doctor.create({
    name: name.trim(),
    department_id,
    contact_number: contact_number.trim(),
    date_of_birth: new Date(date_of_birth),
    qualification: qualification.trim(),
    experience_years,
  });

  return res.status(201).json(new ApiResponse(201, 'Doctor created successfully', doctor));
});

// Get all doctors
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().populate('department_id', 'name').lean();

  return res.status(200).json(new ApiResponse(200, 'Doctors fetched successfully', doctors));
});

// Get doctor by ID
export const getDoctorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid doctor ID format');
  }

  const doctor = await Doctor.findById(id).populate('department_id', 'name').lean();

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Doctor fetched successfully', doctor));
});

// Update doctor
export const updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, department_id, contact_number, date_of_birth, qualification, experience_years } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid doctor ID format');
  }

  if (department_id && !mongoose.Types.ObjectId.isValid(department_id)) {
    throw new ApiError(400, 'Invalid department ID format');
  }

  const doctor = await Doctor.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name?.trim(),
        department_id,
        contact_number: contact_number?.trim(),
        date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
        qualification: qualification?.trim(),
        experience_years,
      },
    },
    { new: true, runValidators: true }
  );

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Doctor updated successfully', doctor));
});

// Delete doctor
export const deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid doctor ID format');
  }

  const doctor = await Doctor.findByIdAndDelete(id);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Doctor deleted successfully', {}));
});
