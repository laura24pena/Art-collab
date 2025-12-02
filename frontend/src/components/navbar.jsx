// src/components/navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Read user from localStorage whenever route changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      console.error("Error reading auth_user from localStorage", e);
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT LINKS */}
      <ul className="left-links">
        {/* MEGA MENU */}
        <li className="dropdown" ref={dropdownRef}>
          <button
            className="dropbtn"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            Explore ▾
          </button>

          {/* MEGA MENU CONTENT */}
          {openDropdown && (
            <div className="mega-menu">
              <div className="mega-header">
                <h2>Explore Art</h2>
                <p>Dive into categories, trends, and curated collections</p>
              </div>

              <div className="mega-grid">
                <div className="mega-section">
                  <h3>Artists</h3>
                  <a href="#top">Top Artists</a>
                  <a href="#featured">Featured Creators</a>
                  <a href="#community">Community Picks</a>
                </div>

                <div className="mega-section">
                  <h3>Photography</h3>
                  <a href="#portray">Portrait</a>
                  <a href="#landscape">Landscape</a>
                  <a href="#street">Street</a>
                </div>

                <div className="mega-section">
                  <h3>Styles</h3>
                  <a href="#digital">Digital Art</a>
                  <a href="#painting">Traditional Painting</a>
                  <a href="#3d">3D &amp; Modeling</a>
                </div>

                <div className="mega-section">
                  <h3>Writing</h3>
                  <a href="#visual">Poems</a>
                  <a href="#stories">Short stories</a>
                  <a href="#essay">Essays</a>
                </div>
              </div>
            </div>
          )}
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/studios">Studios</Link>
        </li>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
      </ul>

      {/* LOGO */}
      <div className="logo">
        <img
          src="/images/homepage/logo.png"
          alt="ArtCollab Logo"
          className="logo-img"
        />
      </div>

      {/* AUTH AREA (RIGHT) */}
      <div className="nav-auth">
        {currentUser ? (
          <>
            <span className="nav-username">
              Hi, {currentUser.username || "Artist"}
            </span>
            <button
              type="button"
              className="nav-btn nav-btn-outline"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Log in
            </Link>
            <Link to="/signup">
              <button className="nav-btn" type="button">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
