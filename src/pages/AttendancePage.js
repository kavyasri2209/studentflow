import React, { useState } from "react";
import "./AttendancePage.css";

import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";

import AttendanceTable from "../components/attendance/AttendanceTable";
import AttendanceStats from "../components/attendance/AttendanceStats";

import { getTodayDate } from "../utils/dateUtils";

function AttendancePage() {
  const { students } = useStudents();
  const {
    loadAttendanceForStudents,
    submitAttendance,
    calculateStats,
    getAttendanceByDate,
  } = useAttendance();

  const [date, setDate] = useState(getTodayDate());
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [records, setRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load students or existing attendance
  const loadData = () => {
    if (!grade || !section) {
      alert("Please select grade and section.");
      return;
    }

    const filtered = students.filter(
      (s) => s.grade === Number(grade) && s.section === section
    );

    const existing = getAttendanceByDate(date);

    let final = [];

    if (existing.length > 0) {
      final = existing.filter((r) =>
        filtered.map((s) => s.id).includes(r.studentId)
      );
    } else {
      final = loadAttendanceForStudents(filtered, date);
    }

    setRecords(final);
    setLoaded(true);
  };

  const updateStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status } : rec
      )
    );
  };

  const updateNotes = (id, notes) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, notes } : rec
      )
    );
  };

  const markAll = (status) => {
    setRecords((prev) => prev.map((rec) => ({ ...rec, status })));
  };

  const handleSubmit = () => {
    submitAttendance(records, date);
    alert("Attendance saved!");
  };

  const stats = calculateStats(records);

  return (
    <div className="attendance-page">
      <h2>Attendance</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="input"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Grade</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Section</option>
          {["A", "B", "C", "D"].map((sec) => (
            <option key={sec}>{sec}</option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={loadData}>
          Load Students
        </button>
      </div>

      {/* Table */}
      {loaded && (
        <>
          <AttendanceStats stats={stats} />

          <div className="actions-row">
            <button className="btn btn-secondary" onClick={() => markAll("present")}>
              Mark All Present
            </button>

            <button className="btn btn-danger" onClick={() => markAll("absent")}>
              Mark All Absent
            </button>
          </div>

          <AttendanceTable
            records={records}
            students={students}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
          />

          <button className="btn btn-primary submit-btn" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </>
      )}
    </div>
  );
}

export default AttendancePage;
