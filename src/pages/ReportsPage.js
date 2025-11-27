import React, { useState } from "react";
import "./ReportsPage.css";

import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";
import { useGrades } from "../context/GradeContext";

import ReportPreview from "../components/reports/ReportPreview";

import { exportToCSV, exportToJSON, printData } from "../utils/exportUtils";
import { showToast } from "../components/common/Toast";

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
      let list = [...students];

      // FIX: Convert grade filter to string for comparison
      if (grade) {
        list = list.filter((s) => s.grade === String(grade));
      }
      if (section) {
        list = list.filter((s) => s.section === section);
      }

      if (list.length === 0) {
        showToast("No students found with selected filters", "warning");
      } else {
        showToast(`Found ${list.length} student(s)`, "success");
      }

      setReportData(list);
    }

    if (type === "attendance") {
      if (!startDate || !endDate) {
        showToast("Please select a valid date range", "error");
        return;
      }

      const list = attendance.filter(
        (r) => r.date >= startDate && r.date <= endDate
      );

      if (list.length === 0) {
        showToast("No attendance records found in selected date range", "warning");
      } else {
        showToast(`Found ${list.length} attendance record(s)`, "success");
      }

      setReportData(list);
    }

    if (type === "grades") {
      if (!studentId) {
        showToast("Please select a student", "error");
        return;
      }

      const list = grades.filter((g) => g.studentId === studentId);

      if (list.length === 0) {
        showToast("No grades found for selected student", "warning");
      } else {
        showToast(`Found ${list.length} grade record(s)`, "success");
      }

      setReportData(list);
    }
  };

  const exportCSV = () => {
    if (reportData.length === 0) {
      showToast("No data to export", "error");
      return;
    }
    exportToCSV(`${type}-report`, reportData);
    showToast("Report exported successfully", "success");
  };

  const exportJSON = () => {
    if (reportData.length === 0) {
      showToast("No data to export", "error");
      return;
    }
    exportToJSON(`${type}-report`, reportData);
    showToast("Report exported successfully", "success");
  };

  return (
    <div className="container-fluid reports-page">
      <h2 className="mb-4">📊 Reports</h2>

      {/* Report Type */}
      <div className="mb-4">
        <select
          className="form-select form-select-lg"
          style={{ maxWidth: '400px' }}
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setReportData([]);
            setGrade("");
            setSection("");
          }}
        >
          <option value="students">Student List Report</option>
          <option value="attendance">Attendance Report</option>
          <option value="grades">Grade Report</option>
        </select>
      </div>

      {/* -------- STUDENT REPORT FILTERS -------- */}
      {type === "students" && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Filter Students</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Grade</label>
                <select
                  className="form-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">All Grades</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Section</label>
                <select
                  className="form-select"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">All Sections</option>
                  {["A", "B", "C", "D"].map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- ATTENDANCE REPORT FILTERS -------- */}
      {type === "attendance" && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Select Date Range</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- GRADES REPORT FILTERS -------- */}
      {type === "grades" && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Select Student</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Student</label>
                <select
                  className="form-select"
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
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-primary btn-lg mb-4" onClick={generateReport}>
        <i className="bi bi-file-earmark-check me-2"></i>
        Generate Report
      </button>

      {/* Report Preview */}
      {reportData.length > 0 && (
        <>
          <ReportPreview type={type} data={reportData} />

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={exportCSV}>
              <i className="bi bi-file-earmark-spreadsheet me-2"></i>
              Export CSV
            </button>
            <button className="btn btn-info" onClick={exportJSON}>
              <i className="bi bi-file-earmark-code me-2"></i>
              Export JSON
            </button>
            <button className="btn btn-secondary" onClick={() => printData("report-preview")}>
              <i className="bi bi-printer me-2"></i>
              Print
            </button>
          </div>
        </>
      )}

      {reportData.length === 0 && (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          Configure filters and click "Generate Report" to view results
        </div>
      )}
    </div>
  );
}

export default ReportsPage;