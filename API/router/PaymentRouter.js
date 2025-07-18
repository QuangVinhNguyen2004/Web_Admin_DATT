const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// Tạo thanh toán mới (thanh toán gia hạn)
router.post('/', async (req, res) => {
  try {
    const { user_id, amount, duration, method } = req.body;

    // Tạo bản ghi thanh toán
    const payment = await Payment.create({
      user_id,
      amount,
      duration,
      method,
      status: 'success',
    });

    // Cập nhật tài khoản user
    const user = await User.findById(user_id);
    const now = new Date();
    const currentExpire = user.expiredAt > now ? user.expiredAt : now;
    user.expiredAt = new Date(currentExpire.getTime() + duration * 24 * 60 * 60 * 1000);
    user.status = 'open';
    await user.save();

    res.json({ message: 'Gia hạn thành công', payment });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi thanh toán' });
  }
});

// Lấy danh sách thanh toán (cho thống kê web)
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('user_id', 'name email');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi truy vấn' });
  }
});

module.exports = router;
