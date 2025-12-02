// src/pages/about.jsx
import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-title-section">
        <h1>About Us</h1>
      </section>

      {/* OUR VISION SECTION */}
      <section className="vision-section">
        <div className="vision-wrapper">
          <div className="vision-text">
            <h1>Our Vision</h1>
            <p>
              We envision a world where artists of every kind—whether painters,
              writers, performers, or digital creators—can freely share their
              voices, ignite inspiration in one another, and come together to
              create beauty beyond imagination. A place where creativity knows
              no boundaries, collaboration sparks meaningful connections, and
              every idea has the power to leave a lasting mark on the world.
            </p>
          </div>

          <div className="vision-image">
            <img src="/images/about/vision.jpg" alt="Our Vision" />
          </div>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="mission-section">
        <h1 className="mission-title">Our Mission</h1>

        <div className="mission-grid">
          <div className="mission-card">
            <img src="/images/about/mission1.jpg" alt="Mission 1" />
            <h2>1. Empower Artists</h2>
            <p>
              We empower artists to share their creativity with the world,
              celebrating every brushstroke, every word, and every performance.
              Here, your talent is seen, valued, and given the platform it
              deserves.
            </p>
          </div>

          <div className="mission-card">
            <img src="/images/about/mission2.jpg" alt="Mission 2" />
            <h2>2. Foster Collaboration</h2>
            <p>
              We connect like-minded creators, fostering collaborations that
              spark innovation, friendship, and unforgettable projects.
              Together, artists can dream bigger and achieve more than they ever
              could alone.
            </p>
          </div>

          <div className="mission-card">
            <img src="/images/about/mission3.jpg" alt="Mission 3" />
            <h2>3. Inspire Growth & Innovation</h2>
            <p>
              We provide tools, guidance, and opportunities that fuel artistic
              growth and ignite imagination. Every project becomes a stepping
              stone toward bold ideas, meaningful impact, and a community that
              thrives on creativity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
