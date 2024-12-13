import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    patient_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    admitted_patient_details: {
      name: {
        type: String,
        required: true,
      },
      date_of_birth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    token: {
      type: Number,
      required: true,
      unique: true,
      default: Math.floor(Math.random() * 1000000),
    },
    doctor_assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    is_opd_done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Queue', queueSchema);
