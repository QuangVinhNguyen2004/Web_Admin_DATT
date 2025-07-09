const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  child_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,    
    required: true,
  },
  duration: {
    type: Number,  
  },
  repeat: {
    type: String,  
    default: 'Không',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
