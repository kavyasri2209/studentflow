import React, { useState, useEffect } from "react";
import "./AddEditStudentModal.css";

import { useStudents } from "../../context/StudentContext";
import { isValidEmail, isValidPhone, hasValue } from "../../utils/validation";

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
  }, [editingStudent]);

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

    if (isEdit) {
      updateStudent(editingStudent.id, form);
    } else {
      try {
        addStudent(form);
      } catch (err) {
        alert(err.message);
      }
    }

    onClose();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{isEdit ? "Edit Student" : "Add Student"}</h3>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="group">
            <input
              className="input"
              name="firstName"
              placeholder="First Name *"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="group">
            <input
              className="input"
              name="lastName"
              placeholder="Last Name *"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div className="group">
            <input
              className="input"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="group">
            <input
              className="input"
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Academic */}
          <div className="row">
            <select
              className="input"
              name="grade"
              value={form.grade}
              onChange={handleChange}
            >
              <option value="">Grade *</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="input"
              name="section"
              value={form.section}
              onChange={handleChange}
            >
              <option value="">Section *</option>
              {["A", "B", "C", "D"].map((sec) => (
                <option key={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <input
              className="input"
              name="rollNumber"
              placeholder="Roll Number *"
              value={form.rollNumber}
              onChange={handleChange}
            />
            {errors.rollNumber && (
              <span className="error">{errors.rollNumber}</span>
            )}
          </div>

          {/* Dates */}
          <div className="row">
            <input
              type="date"
              className="input"
              name="enrollmentDate"
              value={form.enrollmentDate}
              onChange={handleChange}
            />
            <input
              type="date"
              className="input"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Other Fields */}
          <input
            className="input"
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
          />

          <input
            className="input"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            className="input"
            name="parentName"
            placeholder="Parent Name"
            value={form.parentName}
            onChange={handleChange}
          />

          <input
            className="input"
            name="parentContact"
            placeholder="Parent Contact"
            value={form.parentContact}
            onChange={handleChange}
          />

          <input
            className="input"
            name="photoUrl"
            placeholder="Photo URL"
            value={form.photoUrl}
            onChange={handleChange}
          />

          {/* Footer */}
          <div className="footer-btns">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary">{isEdit ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditStudentModal;
