import mongoose from 'mongoose';

const prescribedMedicineSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  inventory_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  prescription_date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('PrescribedMedicine', prescribedMedicineSchema);
