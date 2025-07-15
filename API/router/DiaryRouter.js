const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary');

// Lấy tất cả nhật ký của trẻ được chọn
router.get('/child/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    const diaries = await Diary.find({ child_id: childId })
      .populate('child_id', 'ten img')
      .populate('user', 'ten');
    res.status(200).json(diaries);
  } catch (err) {
    console.error('Lỗi khi lấy nhật ký theo child_id:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy nhật ký theo trẻ' });
  }
});

// Thêm nhật ký
router.post('/', async (req, res) => {
  try {
    const { child_id, noi_dung, user } = req.body;
    if (!child_id || !noi_dung) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }

    const diary = new Diary({ child_id, noi_dung, user });
    await diary.save();
    res.status(201).json(diary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi thêm nhật ký' });
  }
});

// Xóa nhật ký
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Diary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy nhật ký' });
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi xóa nhật ký' });
  }
});
// Thêm dữ liệu mẫu cho 1 child_id
router.get('/seed', async (req, res) => {
  try {
    const { child_id, user } = req.query;
    if (!child_id) return res.status(400).json({ message: 'Thiếu child_id' });

    const dummy = [
      {
        noi_dung: 'Bé ăn hết 1 bát cháo rau củ',
        thoi_gian_tao: new Date(),
      },
      {
        noi_dung: 'Bé ngủ trưa từ 12h đến 14h',
        thoi_gian_tao: new Date(),
      },
      {
        noi_dung: 'Bé chơi trò tô màu với các bạn',
        thoi_gian_tao: new Date(),
      },
    ];

    const data = await Promise.all(
      dummy.map((d) => new Diary({ ...d, child_id, user }).save())
    );

    res.status(201).json({ message: 'Tạo nhật ký mẫu thành công', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi tạo nhật ký mẫu' });
  }
});

module.exports = router;
