import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      // Nếu đăng ký thành công
      setSuccess('Đăng ký thành công! Hãy đăng nhập.');
      setForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

      // Có thể điều hướng ngay hoặc để người dùng tự click "Đăng nhập"
      // window.location.href = '/login';
    } catch (err) {
      console.error(err);
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left section */}
      <div
        className="w-1/2 flex flex-col justify-center items-center text-white px-8"
        style={{
          backgroundImage: "url('https://i.imgur.com/G6hE4Wg.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-center">
          Nếu bạn đã có tài khoản hãy quay lại<br />
          <span className="italic underline cursor-pointer">đăng nhập tại đây</span>
        </p>
        <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200">
          Đăng Nhập
        </button>
      </div>

      {/* Right section */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tạo tài khoản</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              name="firstName"
              placeholder="Tên"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Họ"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Địa chỉ email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />

            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Đăng ký
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 mt-6 text-gray-600">
            <FaGoogle className="cursor-pointer text-2xl hover:text-red-500" />
            <span>&</span>
            <FaFacebookF className="cursor-pointer text-2xl hover:text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
