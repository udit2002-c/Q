import Queue from '../models/queueSchema.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

// Add patient to queue
export const addToQueue = async (req, res) => {
  try {
    const { hospital_id, patient_id, facility_type } = req.body;

    if (!hospital_id || !patient_id || !facility_type) {
      throw new ApiError(400, 'All fields are required');
    }

    const queueType = facility_type === 'EMERGENCY' ? 'EMERGENCY' : 'GENERAL';

    // Find existing queue or create new one
    let queue = await Queue.findOne({ 
      hospital_id,
      type: queueType
    });

    if (!queue) {
      queue = await Queue.create({
        hospital_id,
        type: queueType,
        patients: []
      });
    }

    // For emergency queue, add patient to the front
    if (queueType === 'EMERGENCY') {
      queue.patients.unshift({
        patient_id,
        facility_type,
        priority: 'HIGH'
      });
    } else {
      // For general queue, add to the end
      queue.patients.push({
        patient_id,
        facility_type,
        priority: 'NORMAL'
      });
    }

    await queue.save();

    return res.status(201).json(
      new ApiResponse(201, 'Added to queue successfully', queue)
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Remove patient from queue (when appointment completed)
export const removeFromQueue = async (req, res) => {
  try {
    const { hospital_id, patient_id, queue_type } = req.body;

    if (!queue_type) {
      throw new ApiError(400, 'Queue type is required');
    }

    const queue = await Queue.findOne({ 
      hospital_id,
      type: queue_type
    });
    
    if (!queue) {
      throw new ApiError(404, 'Queue not found');
    }

    // Remove patient from queue (FIFO)
    queue.patients = queue.patients.filter(
      patient => patient.patient_id.toString() !== patient_id
    );

    await queue.save();

    return res.status(200).json(
      new ApiResponse(200, 'Removed from queue successfully', queue)
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Get queue status for both emergency and general queues
export const getQueueStatus = async (req, res) => {
  try {
    const { hospital_id } = req.query;

    const [emergencyQueue, generalQueue] = await Promise.all([
      Queue.findOne({ hospital_id, type: 'EMERGENCY' })
        .populate('patients.patient_id', 'name')
        .lean(),
      Queue.findOne({ hospital_id, type: 'GENERAL' })
        .populate('patients.patient_id', 'name')
        .lean()
    ]);

    const formatQueue = (queue) => {
      if (!queue) return { total: 0, patients: [] };
      
      return {
        total: queue.patients.length,
        patients: queue.patients.map((patient, index) => ({
          ...patient,
          position: index + 1
        }))
      };
    };

    return res.status(200).json(
      new ApiResponse(200, 'Queue status fetched successfully', {
        emergency: formatQueue(emergencyQueue),
        general: formatQueue(generalQueue)
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Get estimated wait time
export const getEstimatedWaitTime = async (req, res) => {
  try {
    const { hospital_id, queue_type } = req.query;

    const queue = await Queue.findOne({ 
      hospital_id,
      type: queue_type
    }).lean();

    if (!queue) {
      return res.status(200).json(
        new ApiResponse(200, 'No queue found', { waitTime: 0 })
      );
    }

    // Estimated time per patient (in minutes)
    const timePerPatient = queue_type === 'EMERGENCY' ? 20 : 15;
    const waitTime = queue.patients.length * timePerPatient;

    return res.status(200).json(
      new ApiResponse(200, 'Wait time calculated successfully', {
        queueLength: queue.patients.length,
        estimatedWaitTime: waitTime,
        timeUnit: 'minutes'
      })
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}; 