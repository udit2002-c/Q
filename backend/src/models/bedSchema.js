import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    // patient_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Patient'
    // },

    beds: {
      count: {
        type: Number,
        required: true,
      },
      facility_type: {
        type: String,
        enum: ['GENERAL', 'PRIVATE', 'SEMI-PRIVATE', 'EMERGENCY'],
        required: true,
      },
    },
    // is_available: {
    //   type: Boolean,
    //   default: true
    // },
    // departure_time: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bed', bedSchema);
