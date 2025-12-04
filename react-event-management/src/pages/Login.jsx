import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [role, setRole] = useState("User");

  const from =
    (location.state && location.state.from && location.state.from.pathname) ||
    null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, role);

    // If redirected from a protected page, go back there
    if (from) {
      navigate(from, { replace: true });
    } else if (role === "Admin") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/events", { replace: true });
    }
  };

  return (
    <div className="login-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 login-card">
              <div className="card-body p-4">
                <h3 className="card-title mb-3 text-center fw-bold">
                  Welcome back
                </h3>
                <p className="text-muted text-center mb-4 small">
                  Use a demo name and choose a role to explore the portal.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
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

                  <button type="submit" className="btn btn-primary w-100">
                    Continue
                  </button>
                </form>
                <p className="text-muted text-center mt-3 small mb-0">
                  Tip: choose <strong>Admin</strong> to access the dashboard and
                  event management tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


