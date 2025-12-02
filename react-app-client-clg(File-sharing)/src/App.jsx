import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import EventLogs from "./pages/EventLogs";
import ForgotPassword from "./pages/ForgotPassword";
import EmailPreview from "./components/EmailPreview";
import CalendarPage from "./pages/Calendar";
import Navbar from "./components/Navbar";

// Refined ProtectedRoute
const ProtectedRoute = ({ children, requiredRole, condition = true }) => {
  const { user } = useAuth();
  if (!user && !condition) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

// New UnauthenticatedRoute for pages that shouldn't be seen by a logged-in user
const UnauthenticatedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const App = () => {
  const { resetEmail } = useAuth();

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
        <Route path="/register" element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>} />
        <Route path="/forgot-password" element={<UnauthenticatedRoute><ForgotPassword /></UnauthenticatedRoute>} />
        <Route path="/email-preview" element={<EmailPreview />} />
        
        {/* Protected Routes for password reset flow */}
        <Route
          path="/otp"
          element={
            <ProtectedRoute condition={!!resetEmail}>
              <OTP />
            </ProtectedRoute>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <Files />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-logs"
          element={
            <ProtectedRoute requiredRole="Admin">
              <EventLogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
