import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCalendarAlt,
  FaChartBar,
  FaPlus,
  FaListUl,
} from "react-icons/fa";

function Navbar() {
  const { user, login, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(name, role);
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm px-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            🎉 EventHub
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/events">
                  <FaListUl className="me-1" /> Events
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  <FaPlus className="me-1" /> Add Event
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/calendar">
                  <FaCalendarAlt className="me-1" /> Calendar
                </NavLink>
              </li>

              {user?.role === "Admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    <FaChartBar className="me-1" /> Dashboard
                  </NavLink>
                </li>
              )}
            </ul>

            {user ? (
              <>
                <span className="navbar-text text-white me-3">
                  <FaUser className="me-1" />
                  {user.name} ({user.role})
                </span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={logout}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowModal(true)}
              >
                <FaSignInAlt className="me-1" /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1050 }}
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={handleLoginSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Login</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
