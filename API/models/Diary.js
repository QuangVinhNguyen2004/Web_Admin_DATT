const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  noi_dung: { type: String, required: true },
  thoi_gian_tao: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

module.exports = mongoose.model('Diary', diarySchema);
