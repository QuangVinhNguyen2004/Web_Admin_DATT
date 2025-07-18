const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SubUser = require('../models/Sub');
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

// Đăng nhập – cho phép tất cả tài khoản không bị khóa
router.post('/login', async (req, res) => {
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

    // B3: Kiểm tra trạng thái tài khoản
    if (user.status === 'private') {
      return res.status(403).json({ message: 'Tài khoản đã bị khóa' });
    }

    // B4: So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    // B5: Trả về thông tin nếu đăng nhập thành công
    res.json({
      message: 'Đăng nhập thành công',
      _id: user._id,
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
// Đăng nhập tài khoản phụ
router.post('/login-subuser', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
  }

  try {
    // Tìm subUser theo email
    const subUser = await SubUser.findOne({ email }).populate('user_id'); // populate để lấy user chính

    if (!subUser) {
      return res.status(400).json({ message: 'Tài khoản phụ không tồn tại' });
    }

    // Kiểm tra tài khoản chính
    const mainUser = subUser.user_id;
    if (!mainUser) {
      return res.status(400).json({ message: 'Tài khoản chính không tồn tại' });
    }

    if (mainUser.status === 'private') {
      return res.status(403).json({ message: 'Tài khoản chính đang bị khóa, không thể đăng nhập tài khoản phụ' });
    }

    // So sánh mật khẩu subUser
    const isMatch = await bcrypt.compare(password, subUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    // Đăng nhập thành công, trả dữ liệu subUser (không trả mật khẩu)
    res.json({
      message: 'Đăng nhập thành công',
      _id: subUser._id,
      name: subUser.name,
      email: subUser.email,
      phone: subUser.phone,
      imgUrl: subUser.imgUrl,
      user_id: mainUser._id, // tham chiếu tài khoản chính
    });
  } catch (err) {
    console.error('Lỗi đăng nhập tài khoản phụ:', err);
    res.status(500).json({ message: 'Lỗi máy chủ. Vui lòng thử lại.' });
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


// Cập nhật user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, password, imgUrl } = req.body;
    const { id } = req.params;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Xử lý email nếu có thay đổi
    if (email) {
      const emailLower = email.trim().toLowerCase();
      const currentEmailLower = existingUser.email.trim().toLowerCase();

      if (emailLower !== currentEmailLower) {
        const emailExists = await User.findOne({ email: emailLower });
        if (emailExists) {
          return res.status(400).json({ message: 'Email đã được sử dụng' });
        }
        existingUser.email = emailLower;
      }
    }

    // Cập nhật các thông tin khác nếu có
    if (name) existingUser.name = name;
    if (phone) existingUser.phone = phone;
    if (imgUrl) existingUser.imgUrl = imgUrl;
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    const updatedUser = await existingUser.save();
    res.json(updatedUser);
  } catch (error) {
    console.error('Lỗi cập nhật user:', error.message, error.stack);
    res.status(500).json({ message: 'Lỗi server khi cập nhật người dùng' });
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
