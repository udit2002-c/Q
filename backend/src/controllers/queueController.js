import Queue from '../models/queueSchema';
import QueueUpdate from '../models/queueUpdateSchema';
import Doctor from '../models/doctorSchema';

export const addToQueue = async (req, res) => {
  try {
    const { hospital_id, patient_details, description } = req.body;

    // Create new queue entry
    const newQueue = await Queue.create({
      hospital_id,
      patient_details,
      description,
    });

    // Find or create queue update for this hospital
    let queueUpdate = await QueueUpdate.findOne({ hospital_id });

    if (!queueUpdate) {
      queueUpdate = await QueueUpdate.create({
        hospital_id,
        queue_positions: [],
      });
    }

    // Add new queue to the end of queue_positions
    const newPosition = queueUpdate.queue_positions.length + 1;
    queueUpdate.queue_positions.push({
      queue_id: newQueue._id,
      position: newPosition,
    });

    await queueUpdate.save();

    res.status(201).json({
      success: true,
      data: {
        queue: newQueue,
        position: newPosition,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getNextInQueue = async (req, res) => {
  try {
    const { hospital_id } = req.params;

    const queueUpdate = await QueueUpdate.findOne({ hospital_id }).populate(
      'queue_positions.queue_id'
    );

    if (!queueUpdate || queueUpdate.queue_positions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No patients in queue',
      });
    }

    const nextPatient = queueUpdate.queue_positions[0].queue_id;

    res.status(200).json({
      success: true,
      data: nextPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all queue status by patient_account
export const getQueuesByPatient = async (req, res) => {
  try {
    const { patient_account } = req.params;

    const queues = await Queue.find({ patient_account })
      .populate('hospital_id', 'display_name address')
      .sort({ createdAt: -1 });

    // Get queue positions for each queue
    const queueDetails = await Promise.all(
      queues.map(async (queue) => {
        const queueUpdate = await QueueUpdate.findOne({
          hospital_id: queue.hospital_id,
          'queue_positions.queue_id': queue._id,
        });

        const position = queueUpdate
          ? queueUpdate.queue_positions.find(
              (pos) => pos.queue_id.toString() === queue._id.toString()
            )?.position
          : null;

        return {
          ...queue.toObject(),
          position,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: queueDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Assign doctor based on shift
const assignDoctor = async (hospitalId) => {
  const currentHour = new Date().getHours();
  const shift = currentHour >= 10 && currentHour < 15 ? 'morning' : 'evening';

  // Only assign if time is within working hours (10 AM to 8 PM)
  if (currentHour < 10 || currentHour >= 20) {
    return null;
  }

  const availableDoctor = await Doctor.findOne({
    hospital_id: hospitalId,
    duty: shift,
  }).sort({ updatedAt: 1 }); // Get least recently assigned doctor

  return availableDoctor?._id;
};

// Process next in queue
export const processNextInQueue = async (req, res) => {
  try {
    const { hospital_id } = req.params;

    const queueUpdate = await QueueUpdate.findOne({ hospital_id })
      .populate('queue_positions.queue_id');

    if (!queueUpdate || queueUpdate.queue_positions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No patients in queue',
      });
    }

    // Get the next patient in queue
    const nextPosition = queueUpdate.queue_positions[0];
    const assignedDoctor = await assignDoctor(hospital_id);

    if (!assignedDoctor) {
      return res.status(400).json({
        success: false,
        message: 'No doctors available for current shift',
      });
    }

    // Update queue update with assigned doctor
    queueUpdate.doctor_assigned = assignedDoctor;
    await queueUpdate.save();

    // Remove the processed patient from queue
    queueUpdate.queue_positions.shift();
    await queueUpdate.save();

    res.status(200).json({
      success: true,
      data: {
        patient: nextPosition.queue_id,
        assigned_doctor: assignedDoctor,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
