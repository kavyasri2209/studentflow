import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import ReportsPage from "./pages/ReportsPage";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* MAIN MODULE PERMISSIONS */}
            <Route
              path="/students"
              element={
                <ProtectedRoute allowed={["administrator"]}>
                  <StudentsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <ProtectedRoute
                  allowed={["administrator", "coordinator", "teacher"]}
                >
                  <AttendancePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/grades"
              element={
                <ProtectedRoute allowed={["administrator", "teacher"]}>
                  <GradesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute allowed={["administrator", "coordinator"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
