import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "studentflow_grades";
const GradeContext = createContext();

const sampleGrades = [
  { id: uuid(), studentId: "sample-1", subject: "Math", assessmentType: "quiz", score: 8, maxScore: 10, percentage: 80, date: "2024-01-10" },
  { id: uuid(), studentId: "sample-2", subject: "Science", assessmentType: "test", score: 18, maxScore: 20, percentage: 90, date: "2024-01-12" },
  { id: uuid(), studentId: "sample-3", subject: "English", assessmentType: "assignment", score: 45, maxScore: 50, percentage: 90, date: "2024-01-15" }
];

const loadGrades = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleGrades;
  } catch {
    return sampleGrades;
  }
};

export const GradeProvider = ({ children }) => {
  const [grades, setGrades] = useState(loadGrades());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
  }, [grades]);

  const addGrade = (data) => {
    if (data.score > data.maxScore) {
      throw new Error("Score cannot exceed Max Score.");
    }

    const newGrade = {
      id: uuid(),
      ...data,
      percentage: Number(((data.score / data.maxScore) * 100).toFixed(2))
    };

    setGrades((prev) => [...prev, newGrade]);
    return newGrade;
  };

  const updateGrade = (id, updated) => {
    setGrades((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              ...updated,
              percentage: Number(((updated.score / updated.maxScore) * 100).toFixed(2)),
            }
          : g
      )
    );
  };

  const deleteGrade = (id) => {
    setGrades((prev) => prev.filter((g) => g.id !== id));
  };

  const getGradesForStudent = (studentId) =>
    grades.filter((g) => g.studentId === studentId);

  const getOverallAverage = (studentId) => {
    const list = getGradesForStudent(studentId);
    if (list.length === 0) return 0;

    return Number(
      (list.reduce((sum, g) => sum + g.percentage, 0) / list.length).toFixed(2)
    );
  };

  const getSubjectAverages = (studentId) => {
    const list = getGradesForStudent(studentId);
    const map = {};

    list.forEach((g) => {
      if (!map[g.subject]) map[g.subject] = { total: 0, count: 0 };
      map[g.subject].total += g.percentage;
      map[g.subject].count += 1;
    });

    const result = {};
    Object.keys(map).forEach((sub) => {
      result[sub] = Number((map[sub].total / map[sub].count).toFixed(2));
    });

    return result;
  };

  return (
    <GradeContext.Provider
      value={{
        grades,
        addGrade,
        updateGrade,
        deleteGrade,
        getGradesForStudent,
        getOverallAverage,
        getSubjectAverages
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};

export const useGrades = () => useContext(GradeContext);
