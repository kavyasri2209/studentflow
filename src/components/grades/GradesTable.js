import React from "react";
import "./GradesTable.css";

import { useGrades } from "../../context/GradeContext";
import { formatReadableDate } from "../../utils/dateUtils";

import { FaEdit, FaTrash } from "react-icons/fa";

function GradesTable({ grades, onEdit }) {
  const { deleteGrade } = useGrades();

  const handleDelete = (id) => {
    if (window.confirm("Delete this grade?")) {
      deleteGrade(id);
    }
  };

  return (
    <div className="grades-table card">
      <h3>Grade Records</h3>

      {grades.length === 0 ? (
        <p className="muted">No grades found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Type</th>
              <th>Score</th>
              <th>Percent</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((g) => (
              <tr key={g.id}>
                <td>{g.subject}</td>
                <td>{g.assessmentType}</td>
                <td>
                  {g.score}/{g.maxScore}
                </td>
                <td>{g.percentage}%</td>
                <td>{formatReadableDate(g.date)}</td>

                <td>
                  <button className="btn" onClick={() => onEdit(g)}>
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(g.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GradesTable;
