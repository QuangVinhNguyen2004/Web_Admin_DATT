const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Lấy tất cả người dùng, có thể lọc 
router.get('/', async (req, res) => {
  try {
    const filter = {};

    if (req.query.role) {
      filter.role = req.query.role;
    }

    const users = await User.find(filter).select('-password');
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

// Đăng nhập – chỉ cho phép tài khoản có role là "custom"
router.post('/lg-custom', async (req, res) => {
  const { email, password } = req.body;

  // B1: Kiểm tra đầu vào
  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
  }

  try {
    // B2: Tìm tài khoản theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' });
    }

    // B3: Chỉ cho phép đăng nhập nếu tài khoản có role là "custom"
    if (user.role !== 'custom') {
      return res.status(403).json({ message: 'Chỉ tài khoản custom mới được phép đăng nhập' });
    }

    // B4: Kiểm tra trạng thái tài khoản
    if (user.status === 'private') {
      return res.status(403).json({ message: 'Tài khoản đã bị khóa' });
    }

    // B5: So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    // B6: Trả về thông tin nếu đăng nhập thành công
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


router.put('/:id', async (req, res) => {
  const { name, phone, email, password, imgUrl, role, status } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    if (typeof name === 'string') user.name = name;
    if (typeof phone === 'string') user.phone = phone;
    if (typeof email === 'string') user.email = email;
    if (typeof imgUrl !== 'undefined') user.imgUrl = imgUrl;
    if (typeof role === 'string') user.role = role;
    if (typeof status === 'string') user.status = status;

    if (typeof password === 'string' && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: 'Cập nhật người dùng thành công', userId: user._id });
  } catch (err) {
    console.error('Lỗi cập nhật người dùng:', err);
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng' });
  }
});

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    user.status = status;
    await user.save();

    res.json({ message: 'Cập nhật trạng thái thành công' });
  } catch (err) {
    console.error('Lỗi cập nhật trạng thái:', err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});



module.exports = router;
