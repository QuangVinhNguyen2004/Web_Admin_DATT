const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const Schedule = require('../models/Schedule');

// Lấy thông báo theo child_id thông qua schedule
router.get('/by-child/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    const notifications = await Notification.find()
      .populate({
        path: 'schedule_id',
        match: { child_id: childId },
      })
      .sort({ thoi_gian: -1 });

    const filtered = notifications.filter(n => n.schedule_id !== null);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông báo' });
  }
});

// Tạo thông báo (dùng khi đến giờ lịch trình)
router.post('/', async (req, res) => {
  try {
    const { schedule_id, noi_dung, thoi_gian } = req.body;
    const newNoti = await Notification.create({
      schedule_id,
      noi_dung,
      thoi_gian,
    });
    res.json(newNoti);
  } catch (err) {
    res.status(400).json({ message: 'Không thể tạo thông báo' });
  }
});

module.exports = router;
