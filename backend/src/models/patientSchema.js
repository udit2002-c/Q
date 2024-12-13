import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
    required: true
  },
  
  photoURL: {
    type: String,
    required:true,
  },

  type: {
    type: String,
    enum: ['INPATIENT', 'OUTPATIENT', 'EMERGENCY'],
    required: true
  },
  admitted_date: {
    type: Date
  },
  discharge_date: {
    type: Date
  },
  expected_discharge_date: {
    type: Date
  },
  current_stage: {
    type: String,
    enum: ['WAITING', 'CONSULTING', 'ADMITTED', 'DISCHARGED'],
    default: 'WAITING'
  },
  insurance_acc:{
    type:String,
    required:true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Patient', patientSchema);