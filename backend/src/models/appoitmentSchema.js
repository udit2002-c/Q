import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
         required: true },

    hospital: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital', 
         required: true },

    doctor: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor' },

    description: { type: String, 
        required: true },

    type: { type: String, 
        enum: ['Emergency', 'General'],
        required: true },

    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    insuranceDetails: {
      type: String,
    },
    // scheduledTime: { type: Date },
    // expectedWaitTime: { type: Number }, // in minutes
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);

