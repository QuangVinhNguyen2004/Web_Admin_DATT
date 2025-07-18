const mongoose = require('mongoose');

const subUserSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  password: { type: String, required: true },
  imgUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SubUser', subUserSchema);
