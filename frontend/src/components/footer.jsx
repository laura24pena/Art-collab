import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
      <footer className="site-footer">
        <div className="footer-container">
          {/* Left - Branding */}
          <div className="footer-left">
            <h3 className="footer-title">ARTCOLLAB</h3>
            <p className="footer-text">
              Making creative projects easier. Connect, collaborate, and create with us.
            </p>
          </div>

          {/* Center - Links */}
          <div className="footer-center">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#studios">Studios</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Right - Contact */}
          <div className="footer-right">
            <h4 className="footer-subtitle">Contact</h4>
            <p>Email: info@artcollab.com</p>
            <p>Phone: +1 (555) 694-0000</p>
            <div className="social-icons">
              <a href="#"><img src="/images/facebook.svg" alt="Facebook" /></a>
              <a href="#"><img src="/images/instagram.svg" alt="Instagram" /></a>
            </div>
          </div>
        </div>

        {/* Footer bottom text */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} ARTCOLLAB. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
