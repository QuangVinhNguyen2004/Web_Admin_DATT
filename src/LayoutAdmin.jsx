import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaClipboardCheck,
  FaChartBar,
  FaHandsHelping,
} from "react-icons/fa";
import "./css/layoutAdmin.css";
import logo from './assets/logo.png';

const menuItems = [
  { path: "/dashboard/home", icon: <FaTachometerAlt />, label: "Bảng điều khiển" },
  { path: "/dashboard/quan-ly-nguoi-dung", icon: <FaUser />, label: "Người dùng" },
  { path: "/dashboard/quan-ly-bai-dang", icon: <FaClipboardCheck />, label: "Duyệt bài" },
  { path: "/dashboard/thong-ke", icon: <FaChartBar />, label: "Thống kê" },
  { path: "/dashboard/ho-tro", icon: <FaHandsHelping />, label: "Hỗ trợ" },
];

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header">
        <Link to="/dashboard/home" className="logo-section">
          <img src={logo} alt="FMCarer Logo" />
          <span className="brand-name">FMCarer</span>
        </Link>
        <div className="header-actions">
          <button className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="layout-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-account-section">
            <span className="account-title">Tài khoản</span>
          </div>
          <nav className="sidebar-menu">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className="menu-item">
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? "active" : ""}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Nội dung chính */}
        <main className="main-content-wrapper">
          <div className="main-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
