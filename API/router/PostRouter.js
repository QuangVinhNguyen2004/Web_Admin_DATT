const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/quicktime'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Chỉ chấp nhận ảnh hoặc video'), false);
};

const upload = multer({ storage, fileFilter });

// =====================
// Tạo bài đăng mới (kèm ảnh + video)
// =====================
router.post('/', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'anh', maxCount: 10 }
]), async (req, res) => {
  try {
    console.log('📥 Nhận request POST /api/post');
    console.log('>>> Body:', req.body);
    console.log('>>> Files:', req.files);

    const { tieu_de, noi_dung, loai, trang_thai, user } = req.body;

    const videoFile = req.files['video']?.[0];
    const imageFiles = req.files['anh'] || [];

    const videoPath = videoFile ? `/uploads/${videoFile.filename}` : null;
    const imagePaths = imageFiles.map(file => `/uploads/${file.filename}`);

    const newPost = new Post({
      user,
      tieu_de,
      noi_dung,
      loai,
      trang_thai,
      video: videoPath,
      anh: imagePaths
    });

    const savedPost = await newPost.save();
    await savedPost.populate('user', 'name');

    res.status(201).json(savedPost);
  } catch (err) {
    console.error('❌ Lỗi tạo bài viết:', err.message);
    res.status(400).json({ error: err.message });
  }
});


// =====================
// Lấy tất cả bài viết hoặc lọc theo trạng thái và loại
// =====================
router.get('/', async (req, res) => {
  try {
    const { trang_thai, loai, user } = req.query;
    const filter = {};

    if (trang_thai) filter.trang_thai = trang_thai;
    if (loai) filter.loai = loai;
    if (user) filter.user = user;

    const posts = await Post.find(filter).populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// Lấy bài viết theo ID
// =====================
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');
    if (!post) return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// Cập nhật toàn bộ bài viết
// =====================
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('user', 'name');
    if (!updatedPost) return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// Cập nhật trạng thái bài viết
// =====================
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

// =====================
// Xóa bài viết
// =====================
router.delete('/:id', async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài đăng' });

  if (post.user.toString() !== userId)
    return res.status(403).json({ message: 'Không có quyền xóa bài viết này' });

  await post.deleteOne();
  res.json({ message: 'Xóa bài đăng thành công' });
});

module.exports = router;
