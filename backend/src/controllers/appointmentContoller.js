const Appointment = require('../models/Appointment');
const Queue = require('../models/Queue');

const appointmentController = {
  // Create new appointment
  createAppointment: async (req, res) => {
    try {
      const appointment = new Appointment({
        ...req.body,
        patient: req.user._id
      });

      // Add to appropriate queue if emergency
      if (req.body.type === 'Emergency') {
        const queue = await Queue.findOne({
          hospital: req.body.hospital,
          type: 'Emergency'
        });
        
        if (queue) {
          queue.patients.push({
            patient: req.user._id,
            queueNumber: queue.currentNumber + 1,
            priority: 'High'
          });
          queue.currentNumber += 1;
          await queue.save();
        }
      }

      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user's appointments
  getUserAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({ patient: req.user._id })
        .populate('hospital')
        .populate('doctor')
        .sort({ scheduledTime: -1 });
      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update appointment status
  updateAppointment: async (req, res) => {
    try {
      const appointment = await Appointment.findOneAndUpdate(
        { _id: req.params.id, patient: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Cancel appointment
  cancelAppointment: async (req, res) => {
    try {
      const appointment = await Appointment.findOne({
        _id: req.params.id,
        patient: req.user._id
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.status = 'Cancelled';
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = appointmentController;