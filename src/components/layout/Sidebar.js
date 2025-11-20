import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  if (!user) return null; // hide sidebar when logged out / on landing page

  return (
    <aside className="sidebar">
      <nav className="menu">

        <NavLink to="/dashboard">Dashboard</NavLink>

        {user.role === "administrator" && (
          <NavLink to="/students">Students</NavLink>
        )}

        {["administrator", "coordinator", "teacher"].includes(user.role) && (
          <NavLink to="/attendance">Attendance</NavLink>
        )}

        {["administrator", "teacher"].includes(user.role) && (
          <NavLink to="/grades">Grades</NavLink>
        )}

        {["administrator", "coordinator"].includes(user.role) && (
          <NavLink to="/reports">Reports</NavLink>
        )}

      </nav>
    </aside>
  );
}

export default Sidebar;
