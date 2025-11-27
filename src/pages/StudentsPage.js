import React, { useState, useMemo } from "react";
import "./StudentsPage.css";

import { useStudents } from "../context/StudentContext";
import StudentCard from "../components/students/StudentCard";
import AddEditStudentModal from "../components/students/AddEditStudentModal";

import { FaPlus } from "react-icons/fa";

function StudentsPage() {
  const { students, searchStudents } = useStudents();

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // SEARCH + FILTERS
  const filteredStudents = useMemo(() => {
    let result = searchStudents(search);

    if (gradeFilter) result = result.filter((s) => s.grade === Number(gradeFilter));
    if (sectionFilter) result = result.filter((s) => s.section === sectionFilter);

    return result;
  }, [students, search, gradeFilter, sectionFilter, searchStudents]);

  return (
    <div className="students-page">
      <div className="header-row">
        <h2>Students</h2>

        <button className="btn btn-primary" onClick={() => {
          setEditingStudent(null);
          setShowModal(true);
        }}>
          <FaPlus /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="input"
          placeholder="Search name, email, roll..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="input" value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
          <option value="">Grade</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">Section</option>
          {["A", "B", "C", "D"].map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      {/* Student Cards */}
      {filteredStudents.length === 0 ? (
        <p className="empty-msg">No students found.</p>
      ) : (
        <div className="cards-grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={() => {
                setEditingStudent(student);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddEditStudentModal
          onClose={() => {
            setShowModal(false);
            setEditingStudent(null);
          }}
          editingStudent={editingStudent}
        />
      )}
    </div>
  );
}

export default StudentsPage;
