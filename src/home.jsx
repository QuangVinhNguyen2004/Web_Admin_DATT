import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './css/home.css'; 
const users = [
  {
    id: "f7h4s5",
    name: "James Silkwell",
    email: "silkwell08@gmail.com",
    createdAt: "12.06.2025 - 12:53 PM",
    phone: "0934324343",
    status: "Hoạt động",
  },
  {
    id: "dsf56yr",
    name: "Doreko999",
    email: "sheikb123@gmail.com",
    createdAt: "12.06.2025 - 12:05 PM",
    phone: "0934324343",
    status: "Hoạt động",
  },
  {
    id: "rhkui33",
    name: "NKKGhost Styer",
    email: "3vkned8@gmail.com",
    createdAt: "12.06.2025 - 11:15 AM",
    phone: "0934324343",
    status: "Hoạt động",
  },
  {
    id: "3lreuw",
    name: "Trịnh Trần Phương Tuấn",
    email: "0xaohbacon5@gmail.com",
    createdAt: "12.06.2025 - 09:53 AM",
    phone: "0934324343",
    status: "Bị khóa",
  },
];

export default function Home() {
  return (
    <div className="account-container">
      <div className="account-top-bar">
        <div className="account-stats">
  <div className="stat-card">
    <h4>Tổng tài khoản</h4>
    <div className="value">40,689</div>
  </div>
  <div className="stat-card">
    <h4>Số tài khoản hoạt động</h4>
    <div className="value">40,283</div>
  </div>
  <div className="stat-card">
    <h4>Số tài khoản bị khóa</h4>
    <div className="value">406</div>
  </div>
  <div className="stat-card">
    <h4>Tài khoản mới</h4>
    <div className="value">4</div>
  </div>
</div>
        <input type="text" placeholder="🔍 Tìm kiếm" className="search-input" />
      </div>

      <div className="table-wrapper">
        <h3>Danh sách tài khoản</h3>
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Thời gian tạo</th>
              <th>Số điện thoại</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.phone}</td>
                <td>
                  <span
                    className={`status-tag ${
                      user.status === "Hoạt động" ? "active" : "banned"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">
                    <FaEdit />
                  </button>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}