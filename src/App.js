import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

// COMPONENTS
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

// Layout Wrapper - Must be inside AuthProvider
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  const hideLayout =
    location.pathname === "/" || location.pathname === "/login";

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
    </div>
  );
}

// App Content with Routes
function AppContent() {
  return (
    <LayoutWrapper>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED */}
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
  );
}

// MAIN APP - All providers wrap the content
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