import mongoose from 'mongoose';

const queueUpdateSchema = new mongoose.Schema(
  {
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    queue_positions: [
      {
        queue_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Queue',
          required: true,
        },
        position: {
          type: Number,
          required: true,
        },
        expected_time: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('QueueUpdate', queueUpdateSchema);
