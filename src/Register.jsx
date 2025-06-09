import React from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

function Register() {
  return (
    <div className="flex h-screen w-screen">
      {/* Left section */}
      <div
        className="w-1/2 flex flex-col justify-center items-center text-white px-8"
        style={{
          backgroundImage: "url('data:image/jpeg;base64,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')", // hoặc thay bằng hình bạn tự host
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Wellcome</h1>
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
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Tên"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Họ"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Địa chỉ email"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            />
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
