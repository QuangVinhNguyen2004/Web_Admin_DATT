import React from "react";

export default function PostManagement() {
  const posts = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      content: "Chia sẻ cách cho con ngủ",
      type: "Cộng đồng",
      status: "Chờ duyệt",
      time: "7:30 AM 19/05/2025",
    },
    ...Array(5).fill({
      id: 1,
      author: "XXXXX",
      content: "",
      type: "XXXXX",
      status: "",
      time: "",
    }),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src="/img/logo.png" alt="Logo" className="h-16" />
        <nav className="space-x-10 text-lg font-semibold uppercase text-gray-800">
          <a href="/home">Trang chủ</a>
          <a href="/quan-ly-bai-dang" className="text-blue-700">Quản lý bài đăng</a>
          <a href="/thong-ke" >Thống kê</a>
          <a href="/quan-ly-nguoi-dung">Quản lý người dùng</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        <table className="min-w-full border border-collapse text-center">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Người đăng</th>
              <th className="border px-4 py-2">Nội dung</th>
              <th className="border px-4 py-2">Loại</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Thời gian</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={idx} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2">{post.id}</td>
                <td className="border px-4 py-2">{post.author}</td>
                <td className="border px-4 py-2">{post.content}</td>
                <td className="border px-4 py-2">{post.type}</td>
                <td className="border px-4 py-2">{post.status}</td>
                <td className="border px-4 py-2">{post.time}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button className="bg-green-200 text-green-800 rounded px-3 py-1 hover:bg-green-300">
                    Duyệt
                  </button>
                  <button className="bg-red-400 text-white rounded px-3 py-1 hover:bg-red-500">
                    Xóa
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
