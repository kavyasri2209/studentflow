import React from "react";
import "./ReportPreview.css";

import { formatReadableDate } from "../../utils/dateUtils";

function ReportPreview({ type, data }) {
  return (
    <div id="report-preview" className="report-preview card">
      <h3>Report Preview</h3>

      {/* Student Report */}
      {type === "students" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr key={s.id}>
                <td>
                  {s.firstName} {s.lastName}
                </td>
                <td>{s.rollNumber}</td>
                <td>{s.grade}</td>
                <td>{s.section}</td>
                <td>{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Attendance Report */}
      {type === "attendance" && (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td>{r.studentId}</td>
                <td>{formatReadableDate(r.date)}</td>
                <td>{r.status.toUpperCase()}</td>
                <td>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Grade Report */}
      {type === "grades" && (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Type</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((g) => (
              <tr key={g.id}>
                <td>{g.subject}</td>
                <td>{g.assessmentType}</td>
                <td>
                  {g.score}/{g.maxScore}
                </td>
                <td>{g.percentage}%</td>
                <td>{formatReadableDate(g.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPreview;
