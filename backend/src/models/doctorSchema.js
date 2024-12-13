import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },
    experience_years: {
      type: Number,
      required: true,
    },
    duty: {
      type: String,
      enum: ['morning', 'evening'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Doctor', doctorSchema);
