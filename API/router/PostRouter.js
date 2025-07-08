const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Tạo bài đăng mới
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả hoặc lọc theo trạng thái / loại bài viết

router.get('/', async (req, res) => {
  try {
    const { trang_thai, loai } = req.query;
    const filter = {};

    if (trang_thai) filter.trang_thai = trang_thai;
    if (loai) filter.loai = loai;

    const posts = await Post.find(filter).populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Lấy tất cả bài viết
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Lấy bài đăng theo ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Cập nhật bài đăng (toàn phần hoặc 1 phần)
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Cập nhật riêng trạng thái bài viết
router.patch('/:id/status', async (req, res) => {
  try {
    const { trang_thai } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài đăng' });

    post.trang_thai = trang_thai;
    await post.save();

    res.json({ message: 'Cập nhật trạng thái thành công', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa bài đăng
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa bài đăng thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
