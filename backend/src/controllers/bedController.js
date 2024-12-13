import { asyncHandler } from '../utils/asyncHandler.js';
import Bed from '../models/bedSchema.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// Create a new bed
export const createBed = asyncHandler(async (req, res) => {
  const { hospital_id, facility_type, count } = req.body;

  if (!hospital_id || !facility_type || !count) {
    throw new ApiError(400, 'All fields are required');
  }

  if (!mongoose.Types.ObjectId.isValid(hospital_id)) {
    throw new ApiError(400, 'Invalid hospital ID format');
  }

  // Check if a bed record already exists for this hospital and facility type
  let bed = await Bed.findOne({ hospital_id, "beds.facility_type": facility_type });

  if (bed) {
    // If exists, update the count
    bed = await Bed.findOneAndUpdate(
      { hospital_id, "beds.facility_type": facility_type },
      { $inc: { "beds.count": count } },
      { new: true, runValidators: true }
    );
  } else {
    // If doesn't exist, create new record
    bed = await Bed.create({
      hospital_id,
      beds: {
        facility_type,
        count
      }
    });
  }

  return res.status(201).json(new ApiResponse(201, 'Bed count updated successfully', bed));
});

// Update bed details
export const updateBed = asyncHandler(async (req, res) => {
  const { bedId } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(bedId)) {
    throw new ApiError(400, 'Invalid bed ID format');
  }

  const bed = await Bed.findByIdAndUpdate(
    bedId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!bed) {
    throw new ApiError(404, 'Bed not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Bed updated successfully', bed));
});

// Get all beds
export const getAllBeds = asyncHandler(async (req, res) => {
  const beds = await Bed.find()
    .populate('hospital_id', 'name location')
    .populate('patient_id', 'name');

  return res.status(200).json(new ApiResponse(200, 'Beds fetched successfully', beds));
});

// Get bed by ID
export const getBedById = asyncHandler(async (req, res) => {
  const { bedId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bedId)) {
    throw new ApiError(400, 'Invalid bed ID format');
  }

  const bed = await Bed.findById(bedId)
    .populate('hospital_id', 'name location')
    .populate('patient_id', 'name');

  if (!bed) {
    throw new ApiError(404, 'Bed not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Bed fetched successfully', bed));
});

// Delete bed
export const deleteBed = asyncHandler(async (req, res) => {
  const { bedId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bedId)) {
    throw new ApiError(400, 'Invalid bed ID format');
  }

  const bed = await Bed.findByIdAndDelete(bedId);

  if (!bed) {
    throw new ApiError(404, 'Bed not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Bed deleted successfully', null));
});

// Add these new controller methods
export const incrementBedCount = asyncHandler(async (req, res) => {
  const { hospital_id, facility_type, increment = 1 } = req.body;

  if (!hospital_id || !facility_type) {
    throw new ApiError(400, 'Hospital ID and facility type are required');
  }

  const bed = await Bed.findOneAndUpdate(
    { hospital_id, "beds.facility_type": facility_type },
    { $inc: { "beds.count": increment } },
    { new: true, runValidators: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, 'Bed count incremented successfully', bed));
});

export const decrementBedCount = asyncHandler(async (req, res) => {
  const { hospital_id, facility_type, decrement = 1 } = req.body;

  if (!hospital_id || !facility_type) {
    throw new ApiError(400, 'Hospital ID and facility type are required');
  }

  const bed = await Bed.findOne({ hospital_id, "beds.facility_type": facility_type });
  
  if (!bed || bed.beds.count < decrement) {
    throw new ApiError(400, 'Insufficient bed count for decrement');
  }

  const updatedBed = await Bed.findOneAndUpdate(
    { hospital_id, "beds.facility_type": facility_type },
    { $inc: { "beds.count": -decrement } },
    { new: true, runValidators: true }
  );

  return res.status(200).json(new ApiResponse(200, 'Bed count decremented successfully', updatedBed));
});
