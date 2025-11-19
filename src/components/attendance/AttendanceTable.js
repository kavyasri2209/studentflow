import React from "react";
import "./AttendanceTable.css";

function AttendanceTable({ records, students, onStatusChange, onNotesChange }) {
  const getStudent = (id) => students.find((s) => s.id === id);

  return (
    <div className="attendance-table card">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec) => {
            const s = getStudent(rec.studentId);
            return (
              <tr key={rec.id}>
                <td>{s ? `${s.firstName} ${s.lastName}` : "Unknown"}</td>
                <td>{s?.rollNumber}</td>

                <td>
                  <div className="status-buttons">
                    <button
                      className={`status-btn present ${
                        rec.status === "present" ? "active" : ""
                      }`}
                      onClick={() => onStatusChange(rec.id, "present")}
                    >
                      P
                    </button>

                    <button
                      className={`status-btn absent ${
                        rec.status === "absent" ? "active" : ""
                      }`}
                      onClick={() => onStatusChange(rec.id, "absent")}
                    >
                      A
                    </button>

                    <button
                      className={`status-btn late ${
                        rec.status === "late" ? "active" : ""
                      }`}
                      onClick={() => onStatusChange(rec.id, "late")}
                    >
                      L
                    </button>
                  </div>
                </td>

                <td>
                  <input
                    className="input notes-input"
                    value={rec.notes}
                    onChange={(e) => onNotesChange(rec.id, e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
