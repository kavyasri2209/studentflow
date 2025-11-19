import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "studentflow_students";
const StudentContext = createContext();

// ---------- SAMPLE STUDENTS ----------
const sampleStudents = [
  {
    id: uuid(),
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    grade: 10,
    section: "A",
    rollNumber: "10A01",
    enrollmentDate: "2022-06-10",
    dateOfBirth: "2007-02-14",
    gender: "Male",
    address: "Hyderabad, Telangana",
    parentName: "Rohit Sharma",
    parentContact: "9876501234",
    photoUrl: ""
  },
  {
    id: uuid(),
    firstName: "Saanvi",
    lastName: "Reddy",
    email: "saanvi.reddy@example.com",
    phone: "9876509876",
    grade: 9,
    section: "B",
    rollNumber: "9B07",
    enrollmentDate: "2021-06-05",
    dateOfBirth: "2008-07-19",
    gender: "Female",
    address: "Bangalore, Karnataka",
    parentName: "Lakshmi Reddy",
    parentContact: "9876540088",
    photoUrl: ""
  },
  {
    id: uuid(),
    firstName: "Vihaan",
    lastName: "Kumar",
    email: "vihaan.kumar@example.com",
    phone: "9876523456",
    grade: 8,
    section: "A",
    rollNumber: "8A12",
    enrollmentDate: "2020-06-12",
    dateOfBirth: "2009-11-03",
    gender: "Male",
    address: "Chennai, Tamil Nadu",
    parentName: "Ramesh Kumar",
    parentContact: "9887765432",
    photoUrl: ""
  },
  {
    id: uuid(),
    firstName: "Anika",
    lastName: "Mehta",
    email: "anika.mehta@example.com",
    phone: "9876534567",
    grade: 7,
    section: "C",
    rollNumber: "7C05",
    enrollmentDate: "2019-06-09",
    dateOfBirth: "2010-03-22",
    gender: "Female",
    address: "Mumbai, Maharashtra",
    parentName: "Priya Mehta",
    parentContact: "9876001234",
    photoUrl: ""
  },
  {
    id: uuid(),
    firstName: "Ishaan",
    lastName: "Singh",
    email: "ishaan.singh@example.com",
    phone: "9876549900",
    grade: 11,
    section: "D",
    rollNumber: "11D03",
    enrollmentDate: "2023-06-14",
    dateOfBirth: "2006-09-30",
    gender: "Male",
    address: "Pune, Maharashtra",
    parentName: "Sandeep Singh",
    parentContact: "9988776655",
    photoUrl: ""
  }
];

// ---------- LOAD FROM STORAGE ----------
const loadStudents = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleStudents;
  } catch {
    return sampleStudents;
  }
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(loadStudents());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Add student
  const addStudent = (data) => {
    // Duplicate Roll Check
    const exists = students.some(
      (s) =>
        s.rollNumber.toLowerCase() === data.rollNumber.toLowerCase() &&
        s.grade === data.grade &&
        s.section === data.section
    );

    if (exists) throw new Error("Roll number already exists in this class.");

    const newStudent = { id: uuid(), ...data };
    setStudents((prev) => [...prev, newStudent]);

    return newStudent;
  };

  // Update student
  const updateStudent = (id, updated) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Get by id
  const getStudentById = (id) => students.find((s) => s.id === id);

  // Search
  const searchStudents = (query) => {
    if (!query.trim()) return students;

    query = query.toLowerCase();

    return students.filter((s) => {
      const name = `${s.firstName} ${s.lastName}`.toLowerCase();
      return (
        name.includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.rollNumber.toLowerCase().includes(query)
      );
    });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        searchStudents
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
