import React from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaFileAlt
} from "react-icons/fa";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role;

  // UPDATED: Force page reload on navigation
  const handleNavClick = (path) => {
    window.location.href = path;
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

// UPDATED: Hide locked components completely based on role
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
          onClick={(e) => {
            e.preventDefault();
            onNavClick("/dashboard");
          }}
        >
          <FaHome size={20} />
          <span>Dashboard</span>
        </NavLink>

        {/* Students - ADMINISTRATOR ONLY - No locked state */}
        {role === "administrator" && (
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={(e) => {
              e.preventDefault();
              onNavClick("/students");
            }}
          >
            <FaUsers size={20} />
            <span>Students</span>
          </NavLink>
        )}

        {/* Attendance - Admin, Coordinator, Teacher */}
        {["administrator", "coordinator", "teacher"].includes(role) && (
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={(e) => {
              e.preventDefault();
              onNavClick("/attendance");
            }}
          >
            <FaClipboardCheck size={20} />
            <span>Attendance</span>
          </NavLink>
        )}

        {/* Grades - Admin and Teacher - No locked state */}
        {["administrator", "teacher"].includes(role) && (
          <NavLink
            to="/grades"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={(e) => {
              e.preventDefault();
              onNavClick("/grades");
            }}
          >
            <FaChartLine size={20} />
            <span>Grades</span>
          </NavLink>
        )}

        {/* Reports - Admin and Coordinator - No locked state */}
        {["administrator", "coordinator"].includes(role) && (
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            onClick={(e) => {
              e.preventDefault();
              onNavClick("/reports");
            }}
          >
            <FaFileAlt size={20} />
            <span>Reports</span>
          </NavLink>
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