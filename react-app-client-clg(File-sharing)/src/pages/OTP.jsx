import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();
  const { resetEmail, otp: storedOtp, resetPassword } = useAuth();

  useEffect(() => {
    if (!resetEmail) {
      toast.error("Invalid access. Please use the 'Forgot Password' link.");
      navigate("/forgot-password");
    }
  }, [resetEmail, navigate]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === storedOtp) {
      toast.success("OTP verified successfully!");
      setShowPasswordForm(true);
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    const success = resetPassword(newPassword);
    if (success) {
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } else {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="container mt-5 col-md-4 shadow p-4 rounded bg-light">
      <h2 className="text-center mb-4">🔑 Verify OTP</h2>
      {!showPasswordForm ? (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-3 text-center">
            <p className="text-muted">An OTP has been sent to <strong>{resetEmail}</strong></p>
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Verify OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <div className="mb-3 text-center">
            <p className="text-muted">Enter your new password.</p>
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default OTP;
