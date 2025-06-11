import React from "react";

export default function UserManagement() {
  const users = [
    { name: "Long", email: "longvdph46585@fpt.edu.vn", phone: "0375106765", admin: "Yes", status: "Loked" },
    { name: "Hai", email: "hai@gmail.com", phone: "0375106765", admin: "No", status: "Unloked" },
    { name: "Huy", email: "huy@gmail.com", phone: "0375106765", admin: "No", status: "Unloked" },
    { name: "Danh", email: "danh@gmail.com", phone: "0375106765", admin: "No", status: "Loked" },
    { name: "Hoang", email: "hoang@gmail.com", phone: "0375106765", admin: "No", status: "Unloked" },
    { name: "Vu", email: "vu@gmail.com", phone: "0375106765", admin: "No", status: "Loked" },
    { name: "Vy", email: "Vy@gmail.com", phone: "0375106765", admin: "No", status: "Unloked" },
    { name: "Ngat", email: "ngat@gmail.comn", phone: "0375106765", admin: "No", status: "Loked" },
    { name: "Tu", email: "tu@gmail.com", phone: "0375106765", admin: "No", status: "Unloked" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src="/img/logo.png" alt="Logo" className="h-16" />
        <nav className="space-x-10 text-lg font-semibold uppercase text-gray-800">
          <a href="/home">Trang chủ</a>
          <a href="/quan-ly-bai-dang">Quản lý bài đăng</a>
          <a href="/thong-ke">Thống kê</a>
          <a href="/quan-ly-nguoi-dung" className="text-blue-700">Quản lý người dùng</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
        <table className="min-w-full border border-collapse text-center shadow-md">
          <thead>
            <tr className="bg-gray-300 text-black">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Admin</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2 text-blue-700 underline">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.admin}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2 text-blue-700 font-semibold cursor-pointer">
                  {user.status.toLowerCase() === "loked" ? "Gỡ khóa" : "Khóa"}
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
