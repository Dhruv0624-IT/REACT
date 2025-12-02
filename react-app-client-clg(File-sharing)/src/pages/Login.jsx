import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLog } from "../context/LogContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const { addLog } = useLog();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(credentials.email)) {
      toast.error("❌ Please enter a valid email address.");
      addLog(`Invalid email format attempt for: ${credentials.email}`, null);
      return;
    }

    // Call login, which now returns the user object on success
    const loggedInUser = login(credentials.email, credentials.password);

    if (loggedInUser) {
      // Pass the user's ID to the log
      addLog(`User logged in: ${loggedInUser.email}`, loggedInUser.id);
      toast.success("✅ Login successful!");
      navigate("/dashboard");
    } else {
      addLog(`Failed login attempt for: ${credentials.email}`, null);
      toast.error("❌ Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="col-md-6 shadow p-4 rounded bg-light">
        <h2 className="text-center mb-4">
          <FaLock /> Secure Portal Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-end mt-2">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;