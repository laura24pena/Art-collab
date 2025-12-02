// src/pages/resetPassword.jsx
import "./resetPassword.css";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../api/client.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing reset token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        token,
        password: newPassword,
      });

      alert("Your password has been reset successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "There was a problem resetting your password.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-body">
      <div className="reset-container">
        <div className="reset-form-section">
          <h1>Reset Password</h1>
          <p className="reset-subtext">
            Please enter and confirm your new password.
          </p>

          <form onSubmit={handleReset} className="reset-form">
            <div className="reset-input-container">
              <label>New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="reset-input-container">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirmPassword((v) => !v)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="reset-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="reset-login-text">
              Remembered your password?{" "}
              <Link to="/" className="login-link">
                Log in
              </Link>
            </p>
          </form>
        </div>

        <div className="reset-image-section">
          <img src="/images/reset.jpg" alt="Reset" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
