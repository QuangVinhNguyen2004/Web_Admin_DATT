import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Home() {
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0947387242",
      email: "vbdhsja@gmail.com",
      password: "**********",
    },
    ...Array(5).fill({
      id: 1,
      name: "XXXXX",
      phone: "XXXXX",
      email: "XXXXX",
      password: "XXXXX",
    }),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src="/img/logo.png" alt="Logo" className="h-16" />
        <nav className="space-x-10 text-lg font-semibold uppercase text-gray-800">
          <a href="#">Trang chủ</a>
          <a href="#">Quản lý bài đăng</a>
          <a href="#">Thống kê</a>
          <a href="#">Quản lý người dùng</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4 hover:bg-blue-800">
          + Thêm tài khoản
        </button>

        <table className="min-w-full border text-center border-collapse">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">NAME</th>
              <th className="border px-4 py-2">SDT</th>
              <th className="border px-4 py-2">EMAIL</th>
              <th className="border px-4 py-2">MẬT KHẨU</th>
              <th className="border px-4 py-2">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.password}</td>
                <td className="border px-4 py-2 space-x-4">
                  <button className="text-blue-700 hover:scale-110">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:scale-110">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
