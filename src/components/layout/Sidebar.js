import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Icons
import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaChartBar,
  FaFileAlt,
  FaBars
} from "react-icons/fa";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();

  return (
    <>
      {/* Mobile Toggle */}
      <div className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </div>

      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        {user && (
          <nav className="menu">

            {/* Dashboard ALWAYS visible */}
            <NavLink className="link" to="/">
              <FaHome /> <span>Dashboard</span>
            </NavLink>

            {/* Administrator ONLY */}
            {user.role === "administrator" && (
              <NavLink className="link" to="/students">
                <FaUsers /> <span>Students</span>
              </NavLink>
            )}

            {/* Admin + Coordinator + Teacher */}
            {["administrator", "coordinator", "teacher"].includes(user.role) && (
              <NavLink className="link" to="/attendance">
                <FaClipboardCheck /> <span>Attendance</span>
              </NavLink>
            )}

            {/* Admin + Teacher */}
            {["administrator", "teacher"].includes(user.role) && (
              <NavLink className="link" to="/grades">
                <FaChartBar /> <span>Grades</span>
              </NavLink>
            )}

            {/* Admin + Coordinator */}
            {["administrator", "coordinator"].includes(user.role) && (
              <NavLink className="link" to="/reports">
                <FaFileAlt /> <span>Reports</span>
              </NavLink>
            )}
          </nav>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
