import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  category: {
    type: String,
    enum: ['MEDICINE', 'EQUIPMENT', 'SUPPLIES'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0
  },
  last_refill_date: {
    type: Date,
    required: true
  },
  expiry_date: {
    type: Date,
    required: true,
    default:null,
  }
}, {
  timestamps: true
});

export default mongoose.model('InventoryItem', inventoryItemSchema);