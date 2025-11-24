import React from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role;

  // Close offcanvas after navigation (mobile)
  const handleNavClick = (path) => {
    navigate(path);
    // Close Bootstrap offcanvas
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar d-none d-lg-block">
        <SidebarContent role={role} onNavClick={handleNavClick} />
      </aside>

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title d-flex align-items-center" id="sidebarOffcanvasLabel">
            <span className="brand-icon me-2">🎓</span>
            <span className="brand-text">StudentFlow</span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <SidebarContent role={role} onNavClick={handleNavClick} />
        </div>
      </div>
    </>
  );
}

// Sidebar Content Component
function SidebarContent({ role, onNavClick }) {
  return (
    <nav className="sidebar-nav">
      <div className="nav flex-column">
        
        {/* Dashboard - All Roles */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          onClick={() => onNavClick("/dashboard")}
        >
          <i className="bi bi-house-door"></i>
          <span>Dashboard</span>
        </NavLink>

        {/* Students - ADMINISTRATOR ONLY */}
        {role === "administrator" && (
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => onNavClick("/students")}
          >
            <i className="bi bi-people"></i>
            <span>Students</span>
          </NavLink>
        )}

        {/* Students - Locked */}
        {role !== "administrator" && (
          <div className="nav-link disabled">
            <i className="bi bi-lock"></i>
            <span>Students</span>
            <span className="badge bg-secondary ms-auto">Admin</span>
          </div>
        )}

        {/* Attendance - Admin, Coordinator, Teacher */}
        {["administrator", "coordinator", "teacher"].includes(role) && (
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => onNavClick("/attendance")}
          >
            <i className="bi bi-clipboard-check"></i>
            <span>Attendance</span>
          </NavLink>
        )}

        {/* Grades - Admin and Teacher */}
        {["administrator", "teacher"].includes(role) && (
          <NavLink
            to="/grades"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => onNavClick("/grades")}
          >
            <i className="bi bi-graph-up"></i>
            <span>Grades</span>
          </NavLink>
        )}

        {/* Grades - Locked */}
        {role === "coordinator" && (
          <div className="nav-link disabled">
            <i className="bi bi-lock"></i>
            <span>Grades</span>
            <span className="badge bg-secondary ms-auto">Teacher</span>
          </div>
        )}

        {/* Reports - Admin and Coordinator */}
        {["administrator", "coordinator"].includes(role) && (
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => onNavClick("/reports")}
          >
            <i className="bi bi-file-earmark-text"></i>
            <span>Reports</span>
          </NavLink>
        )}

        {/* Reports - Locked */}
        {role === "teacher" && (
          <div className="nav-link disabled">
            <i className="bi bi-lock"></i>
            <span>Reports</span>
            <span className="badge bg-secondary ms-auto">Coordinator</span>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar-lg">
            {role === "administrator" && "👑"}
            {role === "coordinator" && "📊"}
            {role === "teacher" && "👨‍🏫"}
          </div>
          <div className="user-details">
            <div className="user-name-small">Quick Access</div>
            <div className="user-role-small">
              {role === "administrator" && "Full Control"}
              {role === "coordinator" && "Monitor & Report"}
              {role === "teacher" && "Teach & Grade"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;