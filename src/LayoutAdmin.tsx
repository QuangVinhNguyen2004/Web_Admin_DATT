import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaClipboardCheck,
  FaChartBar,
  FaHandsHelping,
} from "react-icons/fa"; 
import "../css/layouts/layoutAdmin.css";

const menuItems = [
  {
    path: "/",
    icon: <FaTachometerAlt />,
    label: "Bảng điều khiển",
  },
  {
    path: "/users",
    icon: <FaUser />,
    label: "Người dùng",
  },
  {
    path: "/moderate-posts",
    icon: <FaClipboardCheck />,
    label: "Duyệt bài",
  },
  {
    path: "/statistics",
    icon: <FaChartBar />,
    label: "Thống kê",
  },
  {
    path: "/support",
    icon: <FaHandsHelping />,
    label: "Hỗ trợ",
  },
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
        <Link to="/" className="logo-section">
          <img src="/assets/logo.png" alt="FMCarer Logo" />
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

        {/* Main Content */}
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
