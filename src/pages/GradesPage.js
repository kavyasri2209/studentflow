import React, { useState } from "react";
import "./GradesPage.css";

import { useStudents } from "../context/StudentContext";
import { useGrades } from "../context/GradeContext";

import GradeForm from "../components/grades/GradeForm";
import GradesTable from "../components/grades/GradesTable";

function GradesPage() {
  const { students } = useStudents();
  const {
    getGradesForStudent,
    getOverallAverage,
    getSubjectAverages
  } = useGrades();

  const [selectedStudent, setSelectedStudent] = useState("");
  const [editingGrade, setEditingGrade] = useState(null);

  const studentGrades = selectedStudent
    ? getGradesForStudent(selectedStudent)
    : [];

  const overall = selectedStudent ? getOverallAverage(selectedStudent) : 0;
  const subjectAvg = selectedStudent
    ? getSubjectAverages(selectedStudent)
    : {};

  return (
    <div className="grades-page">
      <h2>Grades</h2>

      {/* Student Selector */}
      <select
        className="input student-select"
        value={selectedStudent}
        onChange={(e) => {
          setSelectedStudent(e.target.value);
          setEditingGrade(null);
        }}
      >
        <option value="">Select Student</option>

        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.firstName} {s.lastName} — {s.rollNumber}
          </option>
        ))}
      </select>

      {/* Form */}
      {selectedStudent && (
        <GradeForm
          studentId={selectedStudent}
          editingGrade={editingGrade}
          onSaved={() => setEditingGrade(null)}
        />
      )}

      {/* Averages */}
      {selectedStudent && (
        <div className="averages card">
          <div>
            <h3>{overall}%</h3>
            <p>Overall Average</p>
          </div>

          <div className="sub-avg">
            <h4>Subject Averages</h4>

            {Object.keys(subjectAvg).length === 0 ? (
              <p className="muted">No grades yet.</p>
            ) : (
              Object.entries(subjectAvg).map(([sub, val]) => (
                <p key={sub}>
                  <strong>{sub}:</strong> {val}%
                </p>
              ))
            )}
          </div>
        </div>
      )}

      {/* Grades Table */}
      {selectedStudent && (
        <GradesTable
          grades={studentGrades}
          onEdit={(grade) => setEditingGrade(grade)}
        />
      )}
    </div>
  );
}

export default GradesPage;
