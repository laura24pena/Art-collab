// src/pages/forgotPassword.jsx
import "./forgotPassword.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });

      alert(
        "If this email is registered, a password reset link has been sent."
      );
    } catch (err) {
      console.error(err);
      alert(
        "There was a problem sending the reset email. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-body">
        <div className="forgot-container">
          <h1 className="forgot-title">Forgot Password</h1>
          <p className="f-forgot-text">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="forgot-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="forgot-btn" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <div className="back-to-login">
            <Link to="/">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
