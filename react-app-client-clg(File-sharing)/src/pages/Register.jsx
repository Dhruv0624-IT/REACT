import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLog } from "../context/LogContext";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addLog } = useLog();
  const [registered, setRegistered] = useState(false);
  const [qrData, setQrData] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "User",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setPasswordValidation({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("❌ Please enter a valid email address.");
      addLog(`Invalid email format attempt during registration for: ${form.email}`, null);
      return;
    }

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      toast.error("❌ Please meet all password requirements.");
      addLog(`Weak password attempt during registration for: ${form.email}`, null);
      return;
    }

    // Call register, which now returns the user object on success
    const newUser = register(form.email, form.password, form.name, form.role);

    if (newUser) {
      // Pass the new user's ID to the log
      addLog(`New user registered: ${form.email}`, newUser.id);
      setQrData(`Registered User: ${form.email}`);
      setRegistered(true);
    }
  };

  useEffect(() => {
    if (registered) {
      const timer = setTimeout(() => navigate("/login"), 4000);
      return () => clearTimeout(timer);
    }
  }, [registered, navigate]);

  const PasswordRequirement = ({ met, text }) => (
    <div className={`d-flex align-items-center mb-1 text-${met ? 'success' : 'danger'}`}>
      {met ? <FaCheckCircle className="me-2" /> : <FaTimesCircle className="me-2" />}
      <small>{text}</small>
    </div>
  );

  return (
    <div className="container mt-5 col-md-6 shadow p-4 rounded bg-light">
      {!registered ? (
        <>
          <h2 className="text-center mb-4">
            <FaUserPlus /> Register New Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <p className="mb-1">Password must contain:</p>
              <PasswordRequirement met={passwordValidation.length} text="At least 6 characters" />
              <PasswordRequirement met={passwordValidation.uppercase} text="One uppercase letter (A-Z)" />
              <PasswordRequirement met={passwordValidation.lowercase} text="One lowercase letter (a-z)" />
              <PasswordRequirement met={passwordValidation.specialChar} text="One special character" />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-control"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Register
            </button>
          </form>
          <div className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3>✅ Registered!</h3>
          <p>Scan QR to verify registration</p>
          <QRCode value={qrData} size={150} />
          <p className="text-muted mt-3">Redirecting to login...</p>
        </div>
      )}
    </div>
  );
};

export default Register;