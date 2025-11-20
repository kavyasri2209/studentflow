import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import ReportsPage from "./pages/ReportsPage";

import ProtectedRoute from "./components/common/ProtectedRoute";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  // hide header & sidebar on landing and login pages
  const hideLayout =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && user && <Header />}
      {!hideLayout && user && <Sidebar />}

      <main
        className={`main-content ${
          hideLayout ? "no-layout" : "with-layout"
        }`}
      >
        {children}
      </main>

      {!hideLayout && user && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LayoutWrapper>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowed={["administrator", "coordinator", "teacher"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

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
              <ProtectedRoute allowed={["administrator", "coordinator", "teacher"]}>
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
        </Routes>
      </LayoutWrapper>
    </AuthProvider>
  );
}

export default App;
