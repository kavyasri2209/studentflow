import React from "react";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light  fixed-top header-navbar">
      <div className="container-fluid">
        
        {/* Sidebar Toggle Button (Mobile) */}
        <button
          className="btn btn-link sidebar-toggle-btn d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          <i className="bi bi-list fs-3"></i>
        </button>

        {/* Brand Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/dashboard">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">StudentFlow</span>
        </a>

        {/* User Info & Logout (Desktop) */}
        <div className="ms-auto d-flex align-items-center gap-3">
          
          {/* User Badge */}
          <div className="user-badge d-none d-md-flex">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-role">
                {user.role === "administrator" && "👑 Administrator"}
                {user.role === "coordinator" && "📊 Coordinator"}
                {user.role === "teacher" && "👨‍🏫 Teacher"}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button className="btn btn-logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span className="d-none d-md-inline ms-2">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;