const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    trim: true,
  },
  phone: {
    type: String,
    required: [true],
    trim: true,
    match: [/^\d{9,11}$/],
  },
  email: {
    type: String,
    required: [true],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/],
  },
  password: {
    type: String,
    required: [true],
    minlength: [6],
  },
  imgUrl: {
    type: String,
    default: '', 
  },
  role: {
    type: String,
    enum: ['user', 'custom'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['open', 'private'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
