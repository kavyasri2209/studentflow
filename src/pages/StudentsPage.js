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

  // Reset all filters
  const handleResetFilters = () => {
    setSearch("");
    setGradeFilter("");
    setSectionFilter("");
  };

  // SEARCH + FILTERS - FIXED: Compare grade as string
  const filteredStudents = useMemo(() => {
    let result = searchStudents(search);

    // FIX: Compare grade as string to string
    if (gradeFilter) result = result.filter((s) => s.grade === String(gradeFilter));
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

      {/* Filters - UPDATED: Single Row with Reset Button */}
      <div className="row g-3 mb-4 align-items-end">
        <div className="col-md-3">
          <label className="form-label fw-semibold small">Search</label>
          <input
            className="form-control"
            placeholder="Search name, email, roll..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-semibold small">Grade</label>
          <select 
            className="form-select" 
            value={gradeFilter} 
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="">All Grades</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                Grade {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-semibold small">Section</label>
          <select
            className="form-select"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="">All Sections</option>
            {["A", "B", "C", "D"].map((sec) => (
              <option key={sec} value={sec}>
                Section {sec}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={handleResetFilters}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset Filters
          </button>
        </div>
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