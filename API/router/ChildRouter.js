const express = require('express');
const router = express.Router();
const Child = require('../models/Child'); // Đường dẫn chính xác tới file model của bạn

// Thêm mới hồ sơ trẻ
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      name,
      age,
      birth_date,
      gender,
      weight,
      img
    } = req.body;

    const newChild = new Child({
      user_id,
      name,
      age,
      birth_date,
      gender,
      weight,
      img
    });

    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (error) {
    console.error('Lỗi thêm hồ sơ trẻ:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi thêm hồ sơ trẻ' });
  }
});

// PUT /child/:id - cập nhật hồ sơ trẻ
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;

    // Bạn có thể validate dữ liệu tại đây nếu muốn

    const updatedChild = await Child.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedChild) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ trẻ' });
    }

    res.json(updatedChild);
  } catch (error) {
    console.error('Lỗi cập nhật hồ sơ trẻ:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật hồ sơ trẻ' });
  }
});


// Xóa hồ sơ trẻ theo _id
router.delete('/:id', async (req, res) => {
  try {
    const deletedChild = await Child.findByIdAndDelete(req.params.id);
    if (!deletedChild) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ trẻ để xóa' });
    }
    res.json({ message: 'Xóa hồ sơ trẻ thành công' });
  } catch (error) {
    console.error('Lỗi xóa hồ sơ trẻ:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi xóa hồ sơ trẻ' });
  }
});

// lấy danh sách hồ sơ trẻ theo user
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: 'Thiếu user_id' });
    }

    const children = await Child.find({ user_id });

    // ✅ Trả về mảng rỗng nếu chưa có hồ sơ nào
    return res.status(200).json(children);
  } catch (err) {
    console.error('Lỗi lấy danh sách trẻ:', err);
    return res.status(500).json({ message: 'Lỗi server khi lấy hồ sơ trẻ' });
  }
});

// Lấy chi tiết hồ sơ trẻ theo id
router.get('/:id', async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ trẻ' });
    }
    res.json(child);
  } catch (error) {
    console.error('Lỗi lấy chi tiết hồ sơ trẻ:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy chi tiết hồ sơ trẻ' });
  }
});

module.exports = router;
