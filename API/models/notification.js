const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  schedule_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  },
  noi_dung: {
    type: String,
    required: true,
  },
  thoi_gian: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
