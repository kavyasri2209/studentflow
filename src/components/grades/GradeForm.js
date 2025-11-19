import React, { useState, useEffect } from "react";
import "./GradeForm.css";

import { useGrades } from "../../context/GradeContext";
import { isScoreValid } from "../../utils/validation";
import { formatDate, getTodayDate } from "../../utils/dateUtils";

function GradeForm({ studentId, editingGrade, onSaved }) {
  const { addGrade, updateGrade } = useGrades();

  const isEdit = Boolean(editingGrade);

  const [form, setForm] = useState({
    subject: "",
    assessmentType: "",
    score: "",
    maxScore: "",
    date: getTodayDate(),
    studentId
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) setForm(editingGrade);
  }, [editingGrade]);

  const validate = () => {
    const e = {};

    if (!form.subject.trim()) e.subject = "Required";
    if (!form.assessmentType.trim()) e.assessmentType = "Required";

    if (!isScoreValid(form.score, form.maxScore))
      e.score = "Score must be <= Max Score";

    if (!form.date) e.date = "Invalid date";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isEdit) {
      updateGrade(editingGrade.id, form);
    } else {
      addGrade(form);
    }

    reset();
    if (onSaved) onSaved();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => {
    setForm({
      subject: "",
      assessmentType: "",
      score: "",
      maxScore: "",
      date: getTodayDate(),
      studentId
    });
    setErrors({});
  };

  return (
    <div className="grade-form card">
      <h3>{isEdit ? "Edit Grade" : "Add Grade"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="subject"
          placeholder="Subject *"
          value={form.subject}
          onChange={handleChange}
        />
        {errors.subject && <span className="error">{errors.subject}</span>}

        <select
          className="input"
          name="assessmentType"
          value={form.assessmentType}
          onChange={handleChange}
        >
          <option value="">Assessment Type *</option>
          <option value="quiz">Quiz</option>
          <option value="test">Test</option>
          <option value="assignment">Assignment</option>
          <option value="midterm">Midterm</option>
          <option value="final">Final</option>
        </select>

        {errors.assessmentType && (
          <span className="error">{errors.assessmentType}</span>
        )}

        <div className="row">
          <div className="col">
            <input
              className="input"
              name="score"
              type="number"
              placeholder="Score *"
              value={form.score}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <input
              className="input"
              name="maxScore"
              type="number"
              placeholder="Max Score *"
              value={form.maxScore}
              onChange={handleChange}
            />
          </div>
        </div>

        {errors.score && <span className="error">{errors.score}</span>}

        <input
          type="date"
          className="input"
          name="date"
          value={formatDate(form.date)}
          onChange={handleChange}
        />
        {errors.date && <span className="error">{errors.date}</span>}

        <div className="form-actions">
          <button type="button" className="btn" onClick={reset}>
            Reset
          </button>

          <button className="btn btn-primary">
            {isEdit ? "Save" : "Add Grade"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GradeForm;
