const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  tieu_de: { type: String, required: true }, 
  noi_dung: { type: String, required: true },
  loai: {   
    type: String,
    enum: ['Cộng đồng', 'Gia đình'],
    default: 'Cộng đồng' 
  },
  trang_thai: {
    type: String,
    enum: ['chờ duyệt', 'đã duyệt', 'bị từ chối'],
    default: 'chờ duyệt'
  },
  video: { type: String, default: null }, // đường dẫn hoặc tên file video
  anh: { type: [String], default: [] },   // danh sách các ảnh (URL hoặc tên file)

  thoi_gian_tao: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
