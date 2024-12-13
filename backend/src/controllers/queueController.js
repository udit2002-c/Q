import Queue from '../models/queueSchema.js';
import QueueUpdate from '../models/queueUpdateSchema.js';
import Doctor from '../models/doctorSchema.js';

const PATIENTS_PER_SHIFT = 10;
const SHIFTS = {
  MORNING: { start: 9, end: 13 }, // 9 AM to 1 PM
  EVENING: { start: 14, end: 18 }, // 2 PM to 6 PM
};

const getCurrentShift = () => {
  const hour = new Date().getHours();
  if (hour >= SHIFTS.MORNING.start && hour < SHIFTS.MORNING.end) return 'MORNING';
  if (hour >= SHIFTS.EVENING.start && hour < SHIFTS.EVENING.end) return 'EVENING';
  return null;
};

const getNextAvailableSlot = async (hospitalId) => {
  const currentShift = getCurrentShift();
  const currentDate = new Date();
  
  // Get all queue updates for today and tomorrow
  const queueUpdates = await QueueUpdate.find({
    hospital_id: hospitalId,
    'queue_positions.expected_time': {
      $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
      $lte: new Date(currentDate.setDate(currentDate.getDate() + 2)),
    },
  });

  // Get available doctors
  const doctors = await Doctor.find({ hospital_id: hospitalId });
  
  // Calculate next available slot
  // ... (implementation details for slot calculation)
  
  return {
    doctorId: availableDoctor._id,
    expectedTime: slotTime,
  };
};

export const addToQueue = async (req, res) => {
  try {
    const { hospital_id, patient_account, admitted_patient_details, description } = req.body;
    
    // Find next available slot
    const { doctorId, expectedTime } = await getNextAvailableSlot(hospital_id);
    
    // Create queue entry
    const queue = new Queue({
      hospital_id,
      patient_account,
      admitted_patient_details,
      description,
      doctor_assigned: doctorId,
    });
    await queue.save();
    
    // Update queue positions
    await QueueUpdate.findOneAndUpdate(
      { hospital_id },
      {
        $push: {
          queue_positions: {
            queue_id: queue._id,
            position: position,
            expected_time: expectedTime,
          },
        },
      },
      { upsert: true }
    );
    
    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQueueStatus = async (req, res) => {
  try {
    const { patient_account, hospital_id } = req.query;
    
    const queueUpdate = await QueueUpdate.findOne({ hospital_id })
      .populate('queue_positions.queue_id');
      
    // Find patient's position and waiting list
    const position = queueUpdate.queue_positions
      .find(pos => pos.queue_id.patient_account.toString() === patient_account);
      
    if (!position) {
      return res.status(404).json({ message: 'Patient not found in queue' });
    }
    
    const patientsAhead = queueUpdate.queue_positions
      .filter(pos => pos.expected_time < position.expected_time).length;
    
    res.json({
      position: position.position,
      expected_time: position.expected_time,
      patients_ahead: patientsAhead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeOPD = async (req, res) => {
  try {
    const { queue_id, hospital_id } = req.body;
    
    // Update queue entry
    await Queue.findByIdAndUpdate(queue_id, { is_opd_done: true });
    
    // Remove from queue positions
    await QueueUpdate.findOneAndUpdate(
      { hospital_id },
      { $pull: { queue_positions: { queue_id } } }
    );
    
    res.json({ message: 'OPD visit completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
