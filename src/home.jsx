import React, { useEffect, useState } from "react";
import { getUsersByRole, updateUserStatus } from "./api/userApi";
import "./css/home.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersByRole("user");
        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách:", err);
      }
    };
    fetchUsers();
  }, []);

  const toggleAccountStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "open" ? "private" : "open";
    try {
      await updateUserStatus(id, newStatus);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  // Thống kê
  const total = users.length;
  const active = users.filter((u) => u.status === "open").length;
  const blocked = users.filter((u) => u.status === "private").length;
  const today = new Date().toISOString().split("T")[0];
  const newToday = users.filter(
    (u) => u.createdAt?.split("T")[0] === today
  ).length;

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(total / usersPerPage);

  return (
    <div className="account-container">
      {/* Thống kê ngang */}
      <div className="account-stats">
        <div className="stat-card">
          <h4>Tổng tài khoản</h4>
          <div className="value">{total}</div>
        </div>
        <div className="stat-card">
          <h4>Hoạt động</h4>
          <div className="value">{active}</div>
        </div>
        <div className="stat-card">
          <h4>Bị khóa</h4>
          <div className="value">{blocked}</div>
        </div>
        <div className="stat-card">
          <h4>Mới hôm nay</h4>
          <div className="value">{newToday}</div>
        </div>
      </div>

      {/* Bảng người dùng */}
      <div className="table-wrapper">
        <h3>Danh sách tài khoản</h3>
        <div className="scrollable-table">
          <table className="account-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày tạo</th>
                <th>Điện thoại</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span
                      className={`status-tag ${
                        user.status === "open" ? "active" : "banned"
                      }`}
                    >
                      {user.status === "open" ? "Hoạt động" : "Bị khóa"}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`toggle-btn ${
                        user.status === "open" ? "lock" : "unlock"
                      }`}
                      onClick={() =>
                        toggleAccountStatus(user._id, user.status)
                      }
                    >
                      {user.status === "open" ? "Khóa" : "Mở"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Trang trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Trang sau →
          </button>
        </div>
      </div>
    </div>
  );
}
