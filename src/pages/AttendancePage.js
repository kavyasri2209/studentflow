import React, { useState, useEffect  } from "react";
import "./AttendancePage.css";
import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";
import AttendanceTable from "../components/attendance/AttendanceTable";
import AttendanceStats from "../components/attendance/AttendanceStats";
import { getTodayDate } from "../utils/dateUtils";
import { showToast } from "../components/common/Toast";

function AttendancePage() {
  const { students, getStudentsByClass } = useStudents();
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

  // Reset when date changes
  useEffect(() => {
    if (loaded && grade && section) {
      loadData();
    }
  }, [date]);

  const loadData = () => {
    if (!grade || !section) {
      showToast("Please select grade and section.", "error");
      return;
    }

    // Get students for selected class
    const classStudents = getStudentsByClass(grade, section);

    if (classStudents.length === 0) {
      showToast(`No students found in Grade ${grade} Section ${section}`, "warning");
      setRecords([]);
      setLoaded(false);
      return;
    }

    // Check if attendance already exists for this date
    const existing = getAttendanceByDate(date);
    const classAttendance = existing.filter((r) =>
      classStudents.some((s) => s.id === r.studentId)
    );

    let final = [];

    if (classAttendance.length > 0) {
      // Load existing attendance
      final = classAttendance;
      showToast(`Loaded existing attendance for ${date}`, "info");
    } else {
      // Create new attendance records
      final = loadAttendanceForStudents(classStudents, date);
      showToast(`Created attendance sheet for ${classStudents.length} students`, "success");
    }

    setRecords(final);
    setLoaded(true);
  };

  const updateStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status } : rec))
    );
  };

  const updateNotes = (id, notes) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, notes } : rec))
    );
  };

  const markAll = (status) => {
    setRecords((prev) => prev.map((rec) => ({ ...rec, status })));
    showToast(`Marked all as ${status.toUpperCase()}`, "info");
  };

  const handleSubmit = () => {
    if (records.length === 0) {
      showToast("No attendance records to submit", "error");
      return;
    }

    submitAttendance(records, date);
    showToast("Attendance saved successfully!", "success");
  };

  const stats = loaded ? calculateStats(records) : { total: 0, present: 0, absent: 0, late: 0, percentage: 0 };

  return (
    <div className="attendance-page">
      <h2>📋 Attendance Management</h2>

      {/* Filters */}
      <div className="filters card">
        <div className="filter-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Grade</label>
            <select
              className="form-select"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setLoaded(false);
              }}
            >
              <option value="">Select Grade</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Section</label>
            <select
              className="form-select"
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setLoaded(false);
              }}
            >
              <option value="">Select Section</option>
              {["A", "B", "C", "D"].map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>&nbsp;</label>
            <button className="btn btn-primary w-100" onClick={loadData}>
              Load Students
            </button>
          </div>
        </div>
      </div>

      {/* Stats and Table */}
      {loaded && records.length > 0 && (
        <>
          <AttendanceStats stats={stats} />

          <div className="actions-row">
            <button className="btn btn-success" onClick={() => markAll("present")}>
              ✅ Mark All Present
            </button>

            <button className="btn btn-danger" onClick={() => markAll("absent")}>
              ❌ Mark All Absent
            </button>

            <button className="btn btn-warning" onClick={() => markAll("late")}>
              ⏰ Mark All Late
            </button>
          </div>

          <AttendanceTable
            records={records}
            students={students}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
          />

          <div className="submit-section">
            <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
              💾 Submit Attendance
            </button>
          </div>
        </>
      )}

      {loaded && records.length === 0 && (
        <div className="card empty-state">
          <h3>No Students Found</h3>
          <p>There are no students in Grade {grade} Section {section}.</p>
          <p>Please add students first or select a different class.</p>
        </div>
      )}

      {!loaded && (
        <div className="card empty-state">
          <h3>👆 Select Class to Begin</h3>
          <p>Choose a grade and section, then click "Load Students" to mark attendance.</p>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
