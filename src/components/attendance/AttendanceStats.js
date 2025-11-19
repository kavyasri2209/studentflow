import React from "react";
import "./AttendanceStats.css";

function AttendanceStats({ stats }) {
  return (
    <div className="attendance-stats card">
      <div className="stat">
        <h3>{stats.total}</h3>
        <p>Total Students</p>
      </div>

      <div className="stat">
        <h3>{stats.present}</h3>
        <p>Present</p>
      </div>

      <div className="stat">
        <h3>{stats.absent}</h3>
        <p>Absent</p>
      </div>

      <div className="stat">
        <h3>{stats.late}</h3>
        <p>Late</p>
      </div>

      <div className="stat">
        <h3>{stats.percentage}%</h3>
        <p>Attendance %</p>
      </div>
    </div>
  );
}

export default AttendanceStats;
