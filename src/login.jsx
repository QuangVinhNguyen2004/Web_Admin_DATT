import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "./api/api";
import './css/login.css'; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log("🔐 Thử đăng nhập với:");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await api.post('/user/lg-custom', { email, password });
      console.log("✅ Đăng nhập thành công:", response.data);

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      const msg = err.response?.data?.message || 'Lỗi đăng nhập';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Đăng Nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <div className="forgot-password">
              Quên mật khẩu? <span>Đặt lại ngay!</span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <div className="social-icons">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
            <span>&</span>
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
          </div>
        </div>

        <div className="login-welcome">
          <h2>Welcome</h2>
          <p>Chưa có Tài khoản? <span>Tạo ngay!</span></p>
          <button>Đăng ký</button>
        </div>
      </div>
    </div>
  );
}
