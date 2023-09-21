import mongoose from 'mongoose';

const BusSchema = new mongoose.Schema({
  state: {
    type: String,
    required: false,
  },
  city: {
    type: Number,
    required: false,
  },
  alpha: {
    type: String,
    required: false,
  },
  numPlate: {
    type: Number,
    required: false,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: false,
  },
  driverNo: {
    type: Number,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  destination: {
    type: String,
    required: false,
  },
  arrivalTime: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
});

export default mongoose.model('Bus', BusSchema);
