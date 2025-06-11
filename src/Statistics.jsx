import React, { useState } from 'react';

export default function Statistics() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    alert(`Thống kê từ ${startDate} đến ${endDate}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src="/img/logo.png" alt="Logo" className="h-16" />
        <nav className="space-x-10 text-lg font-semibold uppercase text-gray-800">
          <a href="/home">Trang chủ</a>
          <a href="/quan-ly-bai-dang">Quản lý bài đăng</a>
          <a href="/thong-ke" className="text-blue-700">Thống kê</a>
          <a href="/quan-ly-nguoi-dung">Quản lý người dùng</a>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-300 flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-10">Thống kê</h1>
        <div className="flex gap-8 mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow">
            <span role="img" aria-label="calendar">📅</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="outline-none"
              placeholder="Chọn ngày bắt đầu"
            />
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded shadow">
            <span role="img" aria-label="calendar">📅</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="outline-none"
              placeholder="Chọn ngày kết thúc"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-red-800 text-white px-6 py-2 font-bold rounded hover:bg-red-700"
          >
            THỐNG KÊ
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white px-8 py-6 grid grid-cols-3 text-sm">
        <div>
          <h4 className="font-bold mb-2">Information</h4>
          <ul>
            <li>Main</li>
            <li>Gallery</li>
            <li>Projects</li>
            <li>Certifications</li>
            <li>Contacts</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contacts</h4>
          <p>📍 1234 Sample Street, Austin Texas 78704</p>
          <p>📞 512.333.2222</p>
          <p>✉️ sampleemail@gmail.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Social Media</h4>
          <div className="flex space-x-4 text-lg mt-1">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">💼</a>
            <a href="#">📌</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
