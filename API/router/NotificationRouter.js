const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const Schedule = require('../models/Schedule');

// Lấy thông báo theo childId, phân trang
router.get('/by-child/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    const page = parseInt(req.query.page) || 1; // trang hiện tại
    const limit = parseInt(req.query.limit) || 20; // số bản ghi mỗi trang

    // 1. Lấy danh sách schedule của child
    const schedules = await Schedule.find({ child_id: childId }).select('_id');
    const scheduleIds = schedules.map(s => s._id);

    // 2. Lấy notification có schedule_id trong scheduleIds
    const notifications = await Notification.find({ schedule_id: { $in: scheduleIds } })
      .sort({ thoi_gian: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('schedule_id', 'activity startTime'); // populate 1 số trường nếu cần

    // 3. Tính tổng số notification
    const total = await Notification.countDocuments({ schedule_id: { $in: scheduleIds } });

    res.json({
      page,
      limit,
      total,
      notifications,
    });
  } catch (err) {
    console.error(err);
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
