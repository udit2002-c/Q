import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Department', departmentSchema);