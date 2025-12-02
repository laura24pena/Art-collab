// src/pages/login.jsx
import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("auth_token", token);
      }
      if (user) {
        localStorage.setItem("auth_user", JSON.stringify(user));
      }

      toast.success("Sesión iniciada correctamente.");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const msg =
        err.response?.data?.message || "Invalid email or password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="form-section">
            <h1>Log In</h1>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                />
              </div>

              <div className="input-container password-container">
                <label>Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
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

              <div className="options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="login-forgot-text"
                >
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="signup-text">
                Don’t have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          <div className="image-section">
            <img src="/images/login.jpg" alt="" />
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>
          This is home — a place where innovation, creativity, and vast
          understanding thrive. Welcome!
        </p>
      </footer>
    </>
  );
};

export default Login;
