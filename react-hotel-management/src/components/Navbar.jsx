import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
        <Link className="navbar-brand fs-4 fw-bold text-white" to="/">
          Hotel Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white hover-underline" to="/">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white hover-underline" to="/reservations">Reservations</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <span className="navbar-text text-white me-3 fs-6">
                  Welcome, {user.username}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="btn btn-primary btn-sm"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          .hover-underline:hover {
            text-decoration: underline !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
