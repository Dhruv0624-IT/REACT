import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold text-dark mb-3">
              Plan, Manage &amp; Celebrate Your Events
            </h1>
            <p className="lead text-muted mb-4">
              A simple portal to create events, manage registrations, and view
              analytics – built for campus fests, tech meets, and more.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/events" className="btn btn-primary btn-lg">
                Browse Events
              </Link>
              <Link to="/calendar" className="btn btn-outline-primary btn-lg">
                View Calendar
              </Link>
              <Link to="/login" className="btn btn-light btn-lg">
                Admin Login
              </Link>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="welcome-hero-card shadow-lg">
              <img
                className="img-fluid rounded-4 mb-3"
                src="https://images.pexels.com/photos/1181555/pexels-photo-1181555.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="People collaborating around a laptop"
              />
              <p className="text-muted small mb-0">
                Visualize your schedule, track registrations, and keep every
                event on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;


