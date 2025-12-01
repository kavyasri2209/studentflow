import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { FaWifi } from "react-icons/fa";

// CONTEXTS
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
import NotFound from "./pages/NotFound";

// COMPONENTS
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Toast from "./components/common/Toast";

// UTILS
import { useNetworkStatus } from "./utils/useNetworkStatus";

// STYLES
import "./App.css";

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

// Layout Wrapper
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();

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
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutWrapper>
  );
}

// MAIN APP
function App() {
  const isOnline = useNetworkStatus();

  return (
    <AuthProvider>
      <StudentProvider>
        <AttendanceProvider>
          <GradeProvider>
            {!isOnline && (
              <div className="bg-danger text-white text-center py-2" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
                <FaWifi /> You are currently offline. Some features may not work.
              </div>
            )}
            <AppContent />
          </GradeProvider>
        </AttendanceProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;