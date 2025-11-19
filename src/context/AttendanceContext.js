import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "studentflow_attendance";
const AttendanceContext = createContext();

const sampleAttendance = [
  { id: uuid(), studentId: "sample-1", date: "2024-01-10", status: "present", notes: "" },
  { id: uuid(), studentId: "sample-2", date: "2024-01-10", status: "late", notes: "10 mins late" },
  { id: uuid(), studentId: "sample-3", date: "2024-01-10", status: "absent", notes: "Sick" },
  { id: uuid(), studentId: "sample-1", date: "2024-01-11", status: "present", notes: "" },
  { id: uuid(), studentId: "sample-2", date: "2024-01-11", status: "present", notes: "" },
  { id: uuid(), studentId: "sample-3", date: "2024-01-11", status: "absent", notes: "" }
];

const loadAttendance = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : sampleAttendance;
  } catch {
    return sampleAttendance;
  }
};

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState(loadAttendance());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const getAttendanceByDate = (date) =>
    attendance.filter((rec) => rec.date === date);

  const loadAttendanceForStudents = (students, date) => {
    const existing = attendance.filter((r) => r.date === date);

    // If already exists — load it
    if (existing.length > 0) return existing;

    // Otherwise create defaults
    return students.map((s) => ({
      id: uuid(),
      studentId: s.id,
      date,
      status: "present",
      notes: ""
    }));
  };

  const updateAttendanceRecord = (id, updates) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...updates } : rec))
    );
  };

  const submitAttendance = (records, date) => {
    const others = attendance.filter((r) => r.date !== date);
    setAttendance([...others, ...records]);
  };

  const calculateStats = (records) => {
    const total = records.length;
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const late = records.filter((r) => r.status === "late").length;

    const percentage = total ? ((present / total) * 100).toFixed(2) : 0;

    return { total, present, absent, late, percentage };
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        getAttendanceByDate,
        loadAttendanceForStudents,
        updateAttendanceRecord,
        submitAttendance,
        calculateStats,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
