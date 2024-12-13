import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    queue_positions: [
      {
        queue_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Queue',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Queue', queueSchema);
