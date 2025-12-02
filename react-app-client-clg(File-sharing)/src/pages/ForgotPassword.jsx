import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useLog } from "../context/LogContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { userList, setResetData } = useAuth();
  const { addLog } = useLog();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userList.find((u) => u.email === email);

    if (user) {
      // In a real application, an email would be sent here.
      // We simulate an OTP for demonstration purposes.
      const generatedOtp = "123456"; 
      setResetData(email, generatedOtp);
      addLog(`Password reset initiated for: ${email}`);
      toast.info(`An OTP (123456) has been sent to ${email}.`);
      navigate("/otp");
    } else {
      toast.error("User with this email does not exist.");
      addLog(`Failed password reset attempt for: ${email}`);
    }
  };

  return (
    <div className="container mt-5 col-md-4 shadow p-4 rounded bg-light">
      <h2 className="text-center mb-4">🔑 Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
      <div className="text-center mt-3">
        Remember your password?{" "}
        <Link to="/login" className="text-decoration-none">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
