import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience_years: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Doctor', doctorSchema);