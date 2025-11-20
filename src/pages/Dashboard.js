import React, { useMemo } from "react";
import "./Dashboard.css";

import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";
import { useGrades } from "../context/GradeContext";
import { useAuth } from "../context/AuthContext";

import { getTodayDate } from "../utils/dateUtils";

import {
  FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaUserCheck,
  FaPlusCircle,
  FaFile
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  const { students } = useStudents();
  const { attendance, getAttendanceByDate } = useAttendance();
  const { grades } = useGrades();

  const today = getTodayDate();

  // Today Attendance Records
  const todayAttendance = getAttendanceByDate(today);

  const todayPresent = todayAttendance.filter(
    (r) => r.status === "present"
  ).length;

  const averageAttendance = useMemo(() => {
    if (attendance.length === 0) return 0;

    const presentCount = attendance.filter(
      (r) => r.status === "present"
    ).length;

    return ((presentCount / attendance.length) * 100).toFixed(2);
  }, [attendance]);

  const averageGrade = useMemo(() => {
    if (grades.length === 0) return 0;

    const total = grades.reduce((sum, g) => sum + g.percentage, 0);
    return (total / grades.length).toFixed(2);
  }, [grades]);

  const recent = [...attendance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Stats Grid */}
      <div className="stats-grid">

        {/* ADMIN only */}
        {role === "administrator" && (
          <div className="stat-card">
            <FaUsers className="stat-icon blue" />
            <div className="stat-info">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
        )}

        {/* ADMIN + COORDINATOR only */}
        {(role === "administrator" || role === "coordinator") && (
          <div className="stat-card">
            <FaClipboardCheck className="stat-icon green" />
            <div className="stat-info">
              <h3>{averageAttendance}%</h3>
              <p>Average Attendance</p>
            </div>
          </div>
        )}

        {/* ADMIN + TEACHER only */}
        {(role === "administrator" || role === "teacher") && (
          <div className="stat-card">
            <FaChartLine className="stat-icon orange" />
            <div className="stat-info">
              <h3>{averageGrade}%</h3>
              <p>Average Grade</p>
            </div>
          </div>
        )}

        {/* All roles */}
        <div className="stat-card">
          <FaUserCheck className="stat-icon purple" />
          <div className="stat-info">
            <h3>{todayPresent}</h3>
            <p>Today's Present</p>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions">

        {/* ADMIN only */}
        {role === "administrator" && (
          <Link to="/students" className="quick-btn">
            <FaPlusCircle /> Add Student
          </Link>
        )}

        {/* ALL ROLES */}
        <Link to="/attendance" className="quick-btn">
          <FaClipboardCheck /> Mark Attendance
        </Link>

        {/* ADMIN + TEACHER */}
        {(role === "administrator" || role === "teacher") && (
          <Link to="/grades" className="quick-btn">
            <FaChartLine /> Add Grades
          </Link>
        )}

        {/* ADMIN + COORDINATOR */}
        {(role === "administrator" || role === "coordinator") && (
          <Link to="/reports" className="quick-btn">
            <FaFile /> Generate Reports
          </Link>
        )}

      </div>

      {/* Recent Activity */}
      <h3 className="section-title">Recent Activities</h3>

      <div className="card recent-list">
        {recent.length === 0 ? (
          <p className="muted">No recent activity.</p>
        ) : (
          recent.map((r) => (
            <div key={r.id} className="recent-item">
              <div>
                <strong>{r.status.toUpperCase()}</strong> — {r.date}
              </div>
              <span className="muted">ID: {r.studentId}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
