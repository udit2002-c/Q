import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  hospital_id: {
    type: String,
    required: true,
    unique: true
  },
  display_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  google_map_link:{
    type:String,
    required:true,
  },
  contact_numbers: [{
    type: String,
    required: true
  }],
  queue_category: {
    type :Boolean,     //true -> emergency and genaral both
    required: true,
  },
  insurance_name:[{
    type:String,
    enum: ['MaxLife', 'MyInsurance', 'LIC'],
  }],
}, {
  timestamps: true
});

export default mongoose.model('Hospital', hospitalSchema);