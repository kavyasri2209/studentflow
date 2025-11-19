import React from "react";
import "./StudentCard.css";

import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useStudents } from "../../context/StudentContext";

function StudentCard({ student, onEdit }) {
  const { deleteStudent } = useStudents();

  const handleDelete = () => {
    if (window.confirm("Delete this student?")) {
      deleteStudent(student.id);
    }
  };

  return (
    <div className="student-card">
      <div className="photo">
        {student.photoUrl ? (
          <img src={student.photoUrl} alt="student" />
        ) : (
          <FaUser className="placeholder" />
        )}
      </div>

      <h3>
        {student.firstName} {student.lastName}
      </h3>

      <p className="muted">
        Grade {student.grade} — Section {student.section}
      </p>

      <p className="roll">Roll: {student.rollNumber}</p>

      <div className="actions">
        <button className="btn" onClick={onEdit}>
          <FaEdit />
        </button>

        <button className="btn btn-danger" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
