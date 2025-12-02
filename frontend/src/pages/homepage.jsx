// src/pages/homepage.jsx
import React, { useState, useEffect, useRef } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  // -----------------------
  // SLIDESHOW STATE
  // -----------------------
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === 3 ? 0 : prev + 1));
  };

  // -----------------------
  // TYPING ANIMATION FOR QUOTE
  // -----------------------
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    const element = quoteRef.current;
    const author = authorRef.current;
    if (!element) return;

    const text = `"Art, to me, is absolute expression. It is not science but rather it's when science becomes loose and mastered."`;
    const typingText = element.querySelector(".typing-text");
    const cursor = element.querySelector(".cursor");

    let index = 0;
    let hasStarted = false;

    const type = () => {
      if (!typingText || !cursor) return;

      if (index < text.length) {
        typingText.textContent = text.substring(0, index + 1);
        index++;
        const delay = 40 + Math.random() * 80;
        setTimeout(type, delay);
      } else {
        cursor.style.display = "none";
        if (author) {
          author.style.opacity = "1";
          author.style.transform = "translateY(0)";
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            hasStarted = true;
            element.style.opacity = "1";
            type();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Where artists connect & create</h1>
          <p>
            Showcase your work. Get real feedback. Collaborate across every art
            form—visual, music, writing, and more.
          </p>
          <Link to="/studios">
            <button className="studios-btn">See studios</button>
          </Link>
        </div>

        <div className="hero-image">
          <img src="/images/homepage/hero.jpg" alt="ArtCollab hero" />
        </div>
      </section>

      {/* CATEGORY CARDS SECTION */}
      <section className="section2" id="section2">
        <h2 className="section-title">Explore Artistic Paths</h2>
        <div className="art-cards">
          <div className="card">
            <img
              src="/images/homepage/digital.jpg"
              alt="Visual Arts"
              className="card-img"
            />
            <h3>Visual Arts</h3>
            <p>Digital art, painting, photography, 3D modeling.</p>
            <button className="learn-btn">Learn more</button>
          </div>

          <div className="card">
            <img
              src="/images/homepage/literary.jpg"
              alt="Literary Arts"
              className="card-img"
            />
            <h3>Literary Arts</h3>
            <p>
              Poetry, fiction, creative nonfiction, and drama &amp;
              screenwriting.
            </p>
            <button className="learn-btn">Learn more</button>
          </div>

          <div className="card">
            <img
              src="/images/homepage/performing.jpg"
              alt="Performing Arts"
              className="card-img"
            />
            <h3>Performing Arts</h3>
            <p>Dance, acting, choreography, and singing.</p>
            <button className="learn-btn">Learn more</button>
          </div>
        </div>
      </section>

      {/* SLIDESHOW SECTION */}
      <section className="section3" id="section3">
        <h1 className="section3-title">Showcase your creative vision</h1>
        <div className="slideshow-wrapper">
          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>

          {slideIndex === 0 && (
            <div className="slideshow-container fade">
              <div className="big-img">
                <img src="/images/homepage/show1-1.jpg" alt="" />
              </div>
              <div className="col">
                <img src="/images/homepage/show1-2.jpg" alt="" />
                <img src="/images/homepage/show1-3.jpg" alt="" />
              </div>
              <div className="col">
                <img src="/images/homepage/show1-4.jpg" alt="" />
                <img src="/images/homepage/show1-5.jpg" alt="" />
              </div>
              <div className="col">
                <img src="/images/homepage/show1-6.jpg" alt="" />
                <img src="/images/homepage/show1-7.jpg" alt="" />
              </div>
            </div>
          )}

          {slideIndex === 1 && (
            <div className="slideshow-container fade">
              <div className="big-img">
                <img src="/images/homepage/show2-1.jpg" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show2-2.png" alt="" />
                <img src="/images/homepage/show2-3.png" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show2-4.jpg" alt="" />
                <img src="/images/homepage/show2-5.png" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show2-6.png" alt="" />
                <img src="/images/homepage/show2-7.png" alt="" />
              </div>
            </div>
          )}

          {slideIndex === 2 && (
            <div className="slideshow-container fade">
              <div className="big-img">
                <img src="/images/homepage/show3-1.jpg" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show3-2.jpg" alt="" />
                <img src="/images/homepage/show3-3.png" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show3-4.png" alt="" />
                <img src="/images/homepage/show3-5.jpg" alt="" />
              </div>

              <div className="col">
                <img src="/images/homepage/show3-6.jpg" alt="" />
                <img src="/images/homepage/show3-7.png" alt="" />
              </div>
            </div>
          )}

          {slideIndex === 3 && (
            <div className="slideshow-container story-layout fade">
              <div className="story-content">
                <h3 className="story-title">
                  Loneliness Goes for Your Eyes First
                </h3>

                <p className="story-excerpt">
                  The day should have started out normal. A boring class, an
                  exhausting routine—something predictable. Instead, fear crept
                  over us like a cold mist, sinking into my bones. By the time I
                  realized something was terribly wrong, it was already too
                  late.
                </p>

                <a
                  href="https://onyxmusings.substack.com/p/loneliness-goes-for-your-eyes-first?r=5o9jti&utm_campaign=post&utm_medium=web&triedRedirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read Full Story →
                </a>
              </div>

              <div className="story-image">
                <img src="/images/homepage/story.jpg" alt="" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TYPING QUOTE SECTION */}
      <section className="quote-section">
        <div className="quote-box">
          <p ref={quoteRef} className="quote">
            <span className="typing-text"></span>
            <span className="cursor">|</span>
          </p>
          <span ref={authorRef} className="quote-author" style={{ opacity: 0 }}>
            — Oyinkansola Aiyelotan
          </span>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="section5">
        <div className="section5-grid">
          <div className="text-left">
            <h2 className="title">
              Connect.
              <br />
              Collaborate. Create.
            </h2>
            <p className="text-body">
              Looking to launch your next creative project? Get in touch—we’re
              ready to make an impact. All artists welcome.
            </p>
          </div>

          <div>
            <form className="contact-form">
              <div className="contact-form-grid">
                <label className="contact_name">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="response"
                />
              </div>
              <div className="contact-form-grid">
                <label className="contact_email">YOUR EMAIL</label>
                <input
                  type="email"
                  placeholder="email@website.com"
                  className="response"
                />
              </div>
              <div className="contact-form-grid">
                <label className="contact_message">YOUR MESSAGE</label>
                <textarea
                  placeholder="Type your message..."
                  className="response"
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
