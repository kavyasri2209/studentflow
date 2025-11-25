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
  FaFile,
  FaLock
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
  const todayAttendance = getAttendanceByDate(today);
  const todayPresent = todayAttendance.filter((r) => r.status === "present").length;

  const averageAttendance = useMemo(() => {
    if (attendance.length === 0) return 0;
    const presentCount = attendance.filter((r) => r.status === "present").length;
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

  // Role-based welcome message
  const getWelcomeMessage = () => {
    switch(role) {
      case "administrator":
        return "Administrator Dashboard - Full System Access";
      case "coordinator":
        return "Academic Coordinator Dashboard - Monitoring & Reports";
      case "teacher":
        return "Teacher Dashboard - Attendance & Grades";
      default:
        return "Welcome to StudentFlow";
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Welcome, {user?.username}! 👋</h2>
          <p className="role-badge-large">{getWelcomeMessage()}</p>
        </div>
      </div>

      {/* ========== STATS GRID ========== */}
      <div className="stats-grid">

        {/* ADMINISTRATOR - All Stats */}
        {role === "administrator" && (
          <>
            <div className="stat-card">
              <FaUsers className="stat-icon blue" />
              <div className="stat-info">
                <h3>{students.length}</h3>
                <p>Total Students</p>
              </div>
            </div>

            <div className="stat-card">
              <FaClipboardCheck className="stat-icon green" />
              <div className="stat-info">
                <h3>{averageAttendance}%</h3>
                <p>Average Attendance</p>
              </div>
            </div>

            <div className="stat-card">
              <FaChartLine className="stat-icon orange" />
              <div className="stat-info">
                <h3>{averageGrade}%</h3>
                <p>Average Grade</p>
              </div>
            </div>

            <div className="stat-card">
              <FaUserCheck className="stat-icon purple" />
              <div className="stat-info">
                <h3>{todayPresent}</h3>
                <p>Today's Present</p>
              </div>
            </div>
          </>
        )}

        {/* COORDINATOR - Attendance focused stats */}
        {role === "coordinator" && (
          <>
            <div className="stat-card">
              <FaClipboardCheck className="stat-icon green" />
              <div className="stat-info">
                <h3>{averageAttendance}%</h3>
                <p>Average Attendance</p>
              </div>
            </div>

            <div className="stat-card">
              <FaUserCheck className="stat-icon purple" />
              <div className="stat-info">
                <h3>{todayPresent}</h3>
                <p>Today's Present</p>
              </div>
            </div>

            <div className="stat-card">
              <FaUsers className="stat-icon blue" />
              <div className="stat-info">
                <h3>{todayAttendance.length}</h3>
                <p>Students Tracked Today</p>
              </div>
            </div>

            <div className="stat-card">
              <FaFile className="stat-icon orange" />
              <div className="stat-info">
                <h3>{attendance.length}</h3>
                <p>Total Records</p>
              </div>
            </div>
          </>
        )}

        {/* TEACHER - Class focused stats */}
        {role === "teacher" && (
          <>
            <div className="stat-card">
              <FaUserCheck className="stat-icon purple" />
              <div className="stat-info">
                <h3>{todayPresent}</h3>
                <p>Today's Present</p>
              </div>
            </div>

            <div className="stat-card">
              <FaClipboardCheck className="stat-icon green" />
              <div className="stat-info">
                <h3>{todayAttendance.length}</h3>
                <p>Students Today</p>
              </div>
            </div>

            <div className="stat-card">
              <FaChartLine className="stat-icon orange" />
              <div className="stat-info">
                <h3>{grades.length}</h3>
                <p>Grades Entered</p>
              </div>
            </div>

            <div className="stat-card">
              <FaFile className="stat-icon blue" />
              <div className="stat-info">
                <h3>{averageGrade}%</h3>
                <p>Class Average</p>
              </div>
            </div>
          </>
        )}

      </div>

      {/* ========== QUICK ACTIONS ========== */}
      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions">

        {/* ADMINISTRATOR - Full Access */}
        {role === "administrator" && (
          <>
            <Link to="/students" className="quick-btn btn-blue">
              <FaPlusCircle /> Manage Students
            </Link>
            <Link to="/attendance" className="quick-btn btn-green">
              <FaClipboardCheck /> Mark Attendance
            </Link>
            <Link to="/grades" className="quick-btn btn-orange">
              <FaChartLine /> Manage Grades
            </Link>
            <Link to="/reports" className="quick-btn btn-purple">
              <FaFile /> Generate Reports
            </Link>
          </>
        )}

        {/* COORDINATOR - Attendance & Reports */}
        {role === "coordinator" && (
          <>
            <Link to="/attendance" className="quick-btn btn-green">
              <FaClipboardCheck /> View Attendance
            </Link>
            <Link to="/reports" className="quick-btn btn-purple">
              <FaFile /> Generate Reports
            </Link>
            <div className="quick-btn btn-disabled">
              <FaLock /> Students (Admin Only)
            </div>
            <div className="quick-btn btn-disabled">
              <FaLock /> Grades (Teachers Only)
            </div>
          </>
        )}

        {/* TEACHER - Attendance & Grades */}
        {role === "teacher" && (
          <>
            <Link to="/attendance" className="quick-btn btn-green">
              <FaClipboardCheck /> Mark Attendance
            </Link>
            <Link to="/grades" className="quick-btn btn-orange">
              <FaChartLine /> Enter Grades
            </Link>
            <div className="quick-btn btn-disabled">
              <FaLock /> Students (Admin Only)
            </div>
            <div className="quick-btn btn-disabled">
              <FaLock /> Reports (Coordinator Access)
            </div>
          </>
        )}
      </div>

      {/* ========== ROLE-BASED INFORMATION PANELS ========== */}
      
      {/* ADMINISTRATOR - System Overview */}
      {role === "administrator" && (
        <div className="info-panel admin-panel">
          <h3 className="section-title">System Overview</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Your Permissions</h4>
              <ul>
                <li>✅ Add, Edit, Delete Students</li>
                <li>✅ Manage All Attendance Records</li>
                <li>✅ View All Grade Reports</li>
                <li>✅ Generate All Reports</li>
                <li>✅ Export Data (CSV/JSON)</li>
                <li>✅ Full System Access</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* COORDINATOR - Monitoring Focus */}
      {role === "coordinator" && (
        <div className="info-panel coordinator-panel">
          <h3 className="section-title">Your Access</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>What You Can Do</h4>
              <ul>
                <li>✅ View All Students (Read-Only)</li>
                <li>✅ Monitor Attendance Records</li>
                <li>✅ Generate Reports</li>
                <li>✅ Export Attendance Data</li>
                <li>❌ Cannot Add/Edit Students</li>
                <li>❌ Cannot Manage Grades</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TEACHER - Teaching Focus */}
      {role === "teacher" && (
        <div className="info-panel teacher-panel">
          <h3 className="section-title">Your Access</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>What You Can Do</h4>
              <ul>
                <li>✅ View Students (Read-Only)</li>
                <li>✅ Mark Daily Attendance</li>
                <li>✅ Enter & Edit Grades</li>
                <li>✅ View Grade Analytics</li>
                <li>❌ Cannot Add/Delete Students</li>
                <li>❌ Cannot Generate Reports</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========== RECENT ACTIVITY ========== */}
      <h3 className="section-title">Recent Activities</h3>

      <div className="card recent-list">
        {recent.length === 0 ? (
          <p className="muted">No recent activity.</p>
        ) : (
          recent.map((r) => (
            <div key={r.id ?? Math.random()} className="recent-item">
              <div>
                <strong className={`status-${r.status}`}>
                  {r.status.toUpperCase()}
                </strong>
                <span className="date-badge">{r.date}</span>
              </div>
              <span className="muted">Student ID: {r.studentId}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;