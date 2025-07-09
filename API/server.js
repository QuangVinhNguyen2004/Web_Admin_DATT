const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error(err));

app.use('/api/user', require('./router/UserRouter'));
app.use('/api/post', require('./router/PostRouter'));
app.use('/api/child', require('./router/ChildRouter'));
app.use('/api/Schedule', require('./router/ScheduleRouter'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
