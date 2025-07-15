const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Lấy lịch theo child_id
router.get('/', async (req, res) => {
  try {
    const { child_id } = req.query;
    if (!child_id) return res.status(400).json({ message: 'Thiếu child_id' });

    const schedules = await Schedule.find({ child_id });
    res.status(200).json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy lịch' });
  }
});

// Thêm lịch
router.post('/', async (req, res) => {
  try {
    const { child_id, activity, description, startTime, duration, repeat } = req.body;

    if (!child_id || !activity || !startTime) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }

    // Chuyển startTime từ chuỗi ISO sang Date 
    const schedule = new Schedule({
      child_id,
      activity,
      description,
      startTime: new Date(startTime),
      duration,
      repeat,
    });

    await schedule.save();

    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi thêm lịch' });
  }
});

// Cập nhật lịch
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (updateData.startTime) {
      updateData.startTime = new Date(updateData.startTime);
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch' });
    }

    res.json(updatedSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi cập nhật lịch' });
  }
});

// Xóa lịch
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Schedule.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy lịch' });

    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi xóa lịch' });
  }
});
// Tạo dữ liệu mẫu cho 1 child_id
router.get('/seed', async (req, res) => {
  try {
    const { child_id } = req.query;
    if (!child_id) return res.status(400).json({ message: 'Thiếu child_id' });

    const dummySchedules = [
      {
        activity: 'Uống sữa',
        description: 'Sữa công thức 200ml',
        startTime: new Date('2025-07-11T07:30:00'),
        duration: 15,
        repeat: 'Không',
      },
      {
        activity: 'Ngủ trưa',
        description: 'Ngủ từ 12h đến 13h30',
        startTime: new Date('2025-07-11T12:00:00'),
        duration: 90,
        repeat: 'Không',
      },
      {
        activity: 'Chơi đồ chơi',
        description: 'Lắp lego và vẽ tranh',
        startTime: new Date('2025-07-11T15:00:00'),
        duration: 30,
        repeat: 'Không',
      },
    ];

    const inserted = await Schedule.insertMany(
      dummySchedules.map((item) => ({ ...item, child_id }))
    );

    res.status(201).json({
      message: 'Đã tạo dữ liệu mẫu thành công',
      data: inserted,
    });
  } catch (err) {
    console.error('Lỗi seed dữ liệu:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo dữ liệu mẫu' });
  }
});

module.exports = router;
