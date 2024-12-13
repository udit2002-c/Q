import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    bedNo: {
      type: Number,
      required: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bed', bedSchema);
