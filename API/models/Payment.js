const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // số tiền
  duration: { type: Number, required: true }, // số ngày được gia hạn
  method: { type: String, default: 'chuyển khoản' }, // phương thức
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'success' },
  paidAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
