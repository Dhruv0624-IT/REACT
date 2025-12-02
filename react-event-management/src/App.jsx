// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import EventList from "./pages/EventList";
import EventForm from "./pages/EventForm";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/CalendarView";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <>
      <Navbar />

      <div className="container pt-5 mt-4">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/calendar" element={<CalendarView />} />

          {/* Admin-only protected routes */}
          <Route
            path="/add"
            element={
              <ProtectedRoute role="Admin">
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute role="Admin">
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="Admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<h4>404 - Page Not Found</h4>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
