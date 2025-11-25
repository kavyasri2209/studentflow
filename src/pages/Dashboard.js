// ...existing code...
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
  // protect against missing providers by giving safe defaults
  const authCtx = useAuth?.() || {};
  const user = authCtx.user || null;
  const role = user?.role;

  const studentsCtx = useStudents?.() || {};
  const students = Array.isArray(studentsCtx.students) ? studentsCtx.students : [];

  const attendanceCtx = useAttendance?.() || {};
  const attendance = Array.isArray(attendanceCtx.attendance) ? attendanceCtx.attendance : [];
  const getAttendanceByDate = typeof attendanceCtx.getAttendanceByDate === "function"
    ? attendanceCtx.getAttendanceByDate
    : null;

  const gradesCtx = useGrades?.() || {};
  const grades = Array.isArray(gradesCtx.grades) ? gradesCtx.grades : [];

  const today = getTodayDate();

  // Today Attendance Records (fallback if provider doesn't supply helper)
  const todayAttendance = getAttendanceByDate
    ? (getAttendanceByDate(today) || [])
    : attendance.filter((r) => {
        // handle different date formats safely
        if (!r || !r.date) return false;
        try {
          return new Date(r.date).toDateString() === new Date(today).toDateString();
        } catch {
          return r.date === today;
        }
      });

  const todayPresent = todayAttendance.filter((r) => r?.status === "present").length;

  const averageAttendance = useMemo(() => {
    if (!attendance || attendance.length === 0) return "0.00";
    const presentCount = attendance.filter((r) => r?.status === "present").length;
    const pct = (presentCount / attendance.length) * 100;
    if (!isFinite(pct)) return "0.00";
    return pct.toFixed(2);
  }, [attendance]);

  const averageGrade = useMemo(() => {
    if (!grades || grades.length === 0) return "0.00";
    const total = grades.reduce((sum, g) => sum + (Number(g?.percentage) || 0), 0);
    const avg = total / grades.length;
    if (!isFinite(avg)) return "0.00";
    return avg.toFixed(2);
  }, [grades]);

  const recent = Array.isArray(attendance)
    ? [...attendance].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
    : [];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Stats Grid */}
      <div className="stats-grid">
        {role === "administrator" && (
          <div className="stat-card">
            <FaUsers className="stat-icon blue" />
            <div className="stat-info">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
        )}

        {(role === "administrator" || role === "coordinator") && (
          <div className="stat-card">
            <FaClipboardCheck className="stat-icon green" />
            <div className="stat-info">
              <h3>{averageAttendance}%</h3>
              <p>Average Attendance</p>
            </div>
          </div>
        )}

        {(role === "administrator" || role === "teacher") && (
          <div className="stat-card">
            <FaChartLine className="stat-icon orange" />
            <div className="stat-info">
              <h3>{averageGrade}%</h3>
              <p>Average Grade</p>
            </div>
          </div>
        )}

        <div className="stat-card">
          <FaUserCheck className="stat-icon purple" />
          <div className="stat-info">
            <h3>{todayPresent}</h3>
            <p>Today's Present</p>
          </div>
        </div>
      </div>

      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions">
        {role === "administrator" && (
          <Link to="/students" className="quick-btn">
            <FaPlusCircle /> Add Student
          </Link>
        )}

        <Link to="/attendance" className="quick-btn">
          <FaClipboardCheck /> Mark Attendance
        </Link>

        {(role === "administrator" || role === "teacher") && (
          <Link to="/grades" className="quick-btn">
            <FaChartLine /> Add Grades
          </Link>
        )}

        {(role === "administrator" || role === "coordinator") && (
          <Link to="/reports" className="quick-btn">
            <FaFile /> Generate Reports
          </Link>
        )}
      </div>

      <h3 className="section-title">Recent Activities</h3>

      <div className="card recent-list">
        {recent.length === 0 ? (
          <p className="muted">No recent activity.</p>
        ) : (
          recent.map((r) => (
            <div key={r.id ?? Math.random()} className="recent-item">
              <div>
                <strong>{String(r?.status ?? "").toUpperCase()}</strong> — {r?.date}
              </div>
              <span className="muted">ID: {r?.studentId}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
// ...existing code...