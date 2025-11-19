import React, { useState } from "react";
import "./ReportsPage.css";

import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";
import { useGrades } from "../context/GradeContext";

import ReportPreview from "../components/reports/ReportPreview";

import { exportToCSV, exportToJSON, printData } from "../utils/exportUtils";
import { formatReadableDate } from "../utils/dateUtils";

function ReportsPage() {
  const { students } = useStudents();
  const { attendance } = useAttendance();
  const { grades } = useGrades();

  const [type, setType] = useState("students");

  // filters
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [studentId, setStudentId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [reportData, setReportData] = useState([]);

  const generateReport = () => {
    if (type === "students") {
      let list = students;

      if (grade) list = list.filter((s) => s.grade === Number(grade));
      if (section) list = list.filter((s) => s.section === section);

      setReportData(list);
    }

    if (type === "attendance") {
      if (!startDate || !endDate) {
        alert("Please select a valid date range.");
        return;
      }

      const list = attendance.filter(
        (r) => r.date >= startDate && r.date <= endDate
      );

      setReportData(list);
    }

    if (type === "grades") {
      if (!studentId) {
        alert("Please select a student.");
        return;
      }

      const list = grades.filter((g) => g.studentId === studentId);
      setReportData(list);
    }
  };

  const exportCSV = () => {
    if (reportData.length === 0) return alert("No data to export.");
    exportToCSV(`${type}-report`, reportData);
  };

  const exportJSON = () => {
    if (reportData.length === 0) return alert("No data to export.");
    exportToJSON(`${type}-report`, reportData);
  };

  return (
    <div className="reports-page">
      <h2>Reports</h2>

      {/* Report Type */}
      <select
        className="input type-select"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setReportData([]);
        }}
      >
        <option value="students">Student List Report</option>
        <option value="attendance">Attendance Report</option>
        <option value="grades">Grade Report</option>
      </select>

      {/* -------- STUDENT REPORT FILTERS -------- */}
      {type === "students" && (
        <div className="filters">
          <select
            className="input"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
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
        </div>
      )}

      {/* -------- ATTENDANCE REPORT FILTERS -------- */}
      {type === "attendance" && (
        <div className="filters">
          <input
            type="date"
            className="input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      {/* -------- GRADES REPORT FILTERS -------- */}
      {type === "grades" && (
        <div className="filters">
          <select
            className="input"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select Student</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} — {s.rollNumber}
              </option>
            ))}
          </select>
        </div>
      )}

      <button className="btn btn-primary" onClick={generateReport}>
        Generate Report
      </button>

      {/* Report Preview */}
      {reportData.length > 0 && (
        <>
          <ReportPreview type={type} data={reportData} />

          <div className="export-btns">
            <button className="btn" onClick={exportCSV}>
              Export CSV
            </button>
            <button className="btn" onClick={exportJSON}>
              Export JSON
            </button>
            <button className="btn btn-secondary" onClick={() => printData("report-preview")}>
              Print
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsPage;
