import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// CONTEXTS - Import all providers
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StudentProvider } from "./context/StudentContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { GradeProvider } from "./context/GradeContext";

// PAGES
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import ReportsPage from "./pages/ReportsPage";
import Footer from "./pages/Footer";

// COMPONENTS
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
// import Footer from "./components/layout/Footer";
import Toast from "./components/common/Toast";


// STYLES
import "./App.css";

// Layout Wrapper
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  // Hide layout on public pages
  const hideLayout = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="app-container">
      {!hideLayout && user && <Header />}
      <div className="app-body">
        {!hideLayout && user && <Sidebar />}
        <main className={`main-content ${hideLayout ? "no-layout" : "with-layout"}`}>
          {children}
        </main>
      </div>
      {!hideLayout && user && <Footer />}
      <Toast />
    </div>
  );
}

// App Content with Routes
function AppContent() {
  return (
    <LayoutWrapper>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<LoginPage />} />

        {/* ========== PROTECTED ROUTES ========== */}
        
        {/* DASHBOARD - All roles can access */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowed={["administrator", "coordinator", "teacher"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* STUDENTS PAGE - Only Administrator (full CRUD) */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowed={["administrator"]}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        {/* ATTENDANCE PAGE - Administrator, Coordinator, Teacher */}
        {/* Administrator: Full access */}
        {/* Coordinator: View and mark attendance */}
        {/* Teacher: Mark attendance for their classes only */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowed={["administrator", "coordinator", "teacher"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        {/* GRADES PAGE - Administrator and Teacher */}
        {/* Administrator: Full access to all grades */}
        {/* Teacher: Add/Edit grades for their subjects */}
        <Route
          path="/grades"
          element={
            <ProtectedRoute allowed={["administrator", "teacher"]}>
              <GradesPage />
            </ProtectedRoute>
          }
        />

        {/* REPORTS PAGE - Administrator and Coordinator */}
        {/* Administrator: Generate all reports */}
        {/* Coordinator: View reports only */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowed={["administrator", "coordinator"]}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard if logged in, otherwise to landing */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </LayoutWrapper>
  );
}

// MAIN APP
function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <AttendanceProvider>
          <GradeProvider>
            <AppContent />
          </GradeProvider>
        </AttendanceProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;