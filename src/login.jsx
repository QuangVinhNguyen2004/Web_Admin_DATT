import React, { useState } from "react";
//import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/login", {
  //       email,
  //       password,
  //     });

  //     // Xử lý khi đăng nhập thành công
  //     const { token, user } = response.data;
  //     localStorage.setItem("token", token);
  //     // Ví dụ: chuyển hướng sang trang chính
  //     window.location.href = "/dashboard";
  //   } catch (err) {
  //     console.error(err);
  //     setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
  //   }
  // };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("https://i.imgur.com/G6hE4Wg.jpeg")' }}
    >
      <div className="flex w-[900px] h-[500px] rounded-xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md">
        <div className="w-1/2 p-10 bg-white">
          <h2 className="text-3xl font-bold text-center mb-6">Đăng Nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="text-sm text-right text-gray-600 mb-4">
              Quên mật khẩu?{" "}
              <span className="font-semibold cursor-pointer hover:underline">
                Đặt lại ngay!
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition duration-200"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex items-center justify-center mt-6 gap-4">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              className="w-8 h-8"
              alt="Google"
            />
            <span className="text-gray-500 font-semibold">&</span>
            <img
              src="https://img.icons8.com/color/48/000000/facebook-new.png"
              className="w-8 h-8"
              alt="Facebook"
            />
          </div>
        </div>

        <div className="w-1/2 bg-black/40 text-white flex flex-col justify-center items-center px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-3">Welcome</h2>
          <p className="text-sm mb-6">
            Chưa có Tài khoản?{" "}
            <span className="font-semibold underline cursor-pointer">
              Tạo ngay!
            </span>
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
