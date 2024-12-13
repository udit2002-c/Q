import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    type: {
      type: String,
      enum: ['GENERAL', 'EMERGENCY'],
      required: true,
    },
    patients: [
      {
        patient_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient',
        },
        facility_type: {
          type: String,
          enum: ['GENERAL', 'PRIVATE', 'ICU', 'EMERGENCY'],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Queue', queueSchema);
