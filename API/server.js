const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const startScheduleNotificationJob = require('./cronJobs/scheduleNotificationJob');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error(err));

// Cấu hình route
app.use('/api/user', require('./router/UserRouter'));
app.use('/api/post', require('./router/PostRouter'));
app.use('/api/child', require('./router/ChildRouter'));
app.use('/api/Schedule', require('./router/ScheduleRouter'));
app.use('/api/Diary', require('./router/DiaryRouter'));
app.use('/api/upload',  require('./router/uploadRouter'));
app.use('/api/notifications', require('./router/NotificationRouter'));

// Phục vụ file tĩnh (ảnh/video đã upload)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Khởi động cron job
startScheduleNotificationJob();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
