import React, { useState, useEffect } from "react";
import "./AddEditStudentModal.css";

import { useStudents } from "../../context/StudentContext";
import { isValidEmail, isValidPhone, hasValue } from "../../utils/validation";
import { showToast } from "../common/Toast";

function AddEditStudentModal({ onClose, editingStudent }) {
  const { addStudent, updateStudent } = useStudents();

  const isEdit = Boolean(editingStudent);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    grade: "",
    section: "",
    rollNumber: "",
    enrollmentDate: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    parentName: "",
    parentContact: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState({});

  // Fill data when editing
  useEffect(() => {
    if (isEdit) setForm(editingStudent);
  }, [editingStudent, isEdit]);

  const validate = () => {
    const e = {};

    if (!hasValue(form.firstName)) e.firstName = "Required";
    if (!hasValue(form.lastName)) e.lastName = "Required";

    if (!isValidEmail(form.email)) e.email = "Invalid email";

    if (!isValidPhone(form.phone)) e.phone = "Phone must be 10 digits";

    if (!hasValue(form.grade)) e.grade = "Required";
    if (!hasValue(form.section)) e.section = "Required";
    if (!hasValue(form.rollNumber)) e.rollNumber = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit) {
        updateStudent(editingStudent.id, form);
        showToast("Student updated successfully!", "success");
      } else {
        addStudent(form);
        showToast("Student added successfully!", "success");
      }
      onClose();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? "Edit Student" : "Add Student"}</h3>
          <button 
            type="button" 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Personal Info */}
          <div className="form-section">
            <h4>Personal Information</h4>
            
            <div className="group">
              <label>First Name *</label>
              <input
                className="input"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div className="group">
              <label>Last Name *</label>
              <input
                className="input"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div className="group">
              <label>Email *</label>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="student@school.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="group">
              <label>Phone *</label>
              <input
                className="input"
                name="phone"
                placeholder="10 digit phone number"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          {/* Academic Info */}
          <div className="form-section">
            <h4>Academic Details</h4>
            
            <div className="row">
              <div className="group">
                <label>Grade *</label>
                <select
                  className="input"
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                >
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                {errors.grade && <span className="error">{errors.grade}</span>}
              </div>

              <div className="group">
                <label>Section *</label>
                <select
                  className="input"
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                >
                  <option value="">Select Section</option>
                  {["A", "B", "C", "D"].map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
                {errors.section && <span className="error">{errors.section}</span>}
              </div>
            </div>

            <div className="group">
              <label>Roll Number *</label>
              <input
                className="input"
                name="rollNumber"
                placeholder="e.g., 10A01"
                value={form.rollNumber}
                onChange={handleChange}
              />
              {errors.rollNumber && (
                <span className="error">{errors.rollNumber}</span>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="form-section">
            <h4>Additional Information</h4>
            
            <div className="row">
              <div className="group">
                <label>Enrollment Date</label>
                <input
                  type="date"
                  className="input"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="input"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="group">
              <label>Gender</label>
              <select
                className="input"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="group">
              <label>Address</label>
              <input
                className="input"
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label>Parent/Guardian Name</label>
              <input
                className="input"
                name="parentName"
                placeholder="Parent Name"
                value={form.parentName}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label>Parent Contact</label>
              <input
                className="input"
                name="parentContact"
                placeholder="Parent Phone"
                value={form.parentContact}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label>Photo URL (Optional)</label>
              <input
                className="input"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                value={form.photoUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="footer-btns">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditStudentModal;