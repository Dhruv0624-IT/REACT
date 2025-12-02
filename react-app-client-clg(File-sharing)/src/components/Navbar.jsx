import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-lg">
      <div className="container-fluid">

        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to={user ? "/dashboard" : "/login"}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="me-2">🔐</span> Secure Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/files" onClick={() => setIsMenuOpen(false)}>
                    📁 Files
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/calendar" onClick={() => setIsMenuOpen(false)}>
                    📅 Calendar
                  </Link>
                </li>
                {user.role === "Admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        📊 Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/event-logs" onClick={() => setIsMenuOpen(false)}>
                        📜 Logs
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center me-2">
                  <Link to="/dashboard" className="nav-link px-2 py-1 rounded-md text-white hover:bg-dark" onClick={() => setIsMenuOpen(false)}>
                    👤 {user.name} ({user.role})
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;