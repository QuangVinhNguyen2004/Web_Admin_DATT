import React, { useState } from 'react';
import './css/support.css'; // nếu muốn tách CSS riêng

const Support = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gửi thành công!\nEmail: ${email}\nNội dung: ${message}`);
    setEmail('');
    setMessage('');
  };

  return (
    <div className="support-container">
      <h2>Hỗ trợ & Liên hệ</h2>
      <p>Nếu bạn gặp sự cố hoặc có câu hỏi, vui lòng liên hệ:</p>
      <ul>
        <li>📧 Email: support@swear.vn</li>
        <li>📞 Hotline: 0123 456 789</li>
      </ul>

      <hr />

      <h3>Gửi phản hồi hoặc yêu cầu hỗ trợ</h3>
      <form onSubmit={handleSubmit} className="support-form">
        <label>
          Email của bạn:
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </label>
        <label>
          Nội dung:
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập mô tả vấn đề hoặc phản hồi của bạn..."
          />
        </label>
        <button type="submit">Gửi hỗ trợ</button>
      </form>
    </div>
  );
};

export default Support;
