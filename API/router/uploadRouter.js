const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục uploads nếu chưa có
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/quicktime'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Chỉ cho phép ảnh hoặc video'), false);
};

const upload = multer({ storage, fileFilter });

// --- 1. Upload ảnh đơn ---
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi upload ảnh' });
  }
});

// --- 2. Upload nhiều ảnh ---
router.post('/upload-images', upload.array('images', 10), (req, res) => {
  try {
    const urls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi upload nhiều ảnh' });
  }
});

// --- 3. Upload video ---
router.post('/upload-video', upload.single('video'), (req, res) => {
  try {
    const videoUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ url: videoUrl });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi upload video' });
  }
});

module.exports = router;
