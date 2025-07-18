const express = require('express');
const router = express.Router();
const SubUser = require('../models/Sub');

// Tạo sub-user
router.post('/', async (req, res) => {
  try {
    const newSubUser = new SubUser(req.body);
    const saved = await newSubUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Tạo sub-user thất bại', details: err.message });
  }
});

// Lấy danh sách tất cả sub-user (có populate user_id)
router.get('/', async (req, res) => {
  try {
    const list = await SubUser.find().populate('user_id');
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách', details: err.message });
  }
});

// Lấy sub-user theo ID
router.get('/:id', async (req, res) => {
  try {
    const sub = await SubUser.findById(req.params.id);
    if (!sub) {
      return res.status(404).json({ error: 'Không tìm thấy sub-user' });
    }
    res.status(200).json(sub);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// Lấy danh sách sub-user theo user_id
router.get('/user/:userId', async (req, res) => {
  try {
    const list = await SubUser.find({ user_id: req.params.userId });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách theo user_id', details: err.message });
  }
});

// Cập nhật sub-user
router.put('/:id', async (req, res) => {
  try {
    const updated = await SubUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Không tìm thấy sub-user để cập nhật' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Cập nhật thất bại', details: err.message });
  }
});

// Xóa sub-user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SubUser.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Không tìm thấy sub-user để xóa' });
    }
    res.status(200).json({ message: 'Đã xóa sub-user thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Xóa thất bại', details: err.message });
  }
});

module.exports = router;
