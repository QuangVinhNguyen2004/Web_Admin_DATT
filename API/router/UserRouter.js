const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Lấy tất cả người dùng (ẩn password)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { name, phone, email, password, imgUrl } = req.body;

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin người dùng.' });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(409).json({ message: 'Email đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      imgUrl: imgUrl || '', 
      role: 'user',
      status: 'open',
    });

    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công', userId: newUser._id });
  } catch (err) {
    console.error('Lỗi đăng ký:', err);
    res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại sau.' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại' });

    // Kiểm tra trạng thái tài khoản
    if (user.status === 'private') {
      return res.status(403).json({ message: 'Tài khoản đã bị khóa' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    res.json({
      message: 'Đăng nhập thành công',
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      imgUrl: user.imgUrl,
    });
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại.' });
  }
});

// Cập nhật người dùng
router.put('/:id', async (req, res) => {
  const { name, phone, email, password, imgUrl, role, status } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    if (imgUrl !== undefined) user.imgUrl = imgUrl;
    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    res.json({ message: 'Cập nhật người dùng thành công', userId: user._id });
  } catch (err) {
    console.error('Lỗi cập nhật người dùng:', err);
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng' });
  }
});



module.exports = router;
