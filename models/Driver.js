import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
  driverNo: {
    type: Number,
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: false,
  },
});

export default mongoose.model('Driver', DriverSchema);
