import React from 'react';
import './hero.css'; 
const profileImageUrl = 'https://res.cloudinary.com/dyi2x7iiu/image/upload/v1755249721/img.720Z_qd9rpz.png';

function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-image-wrapper">
          <img src={profileImageUrl} alt="Afshan Qasim" />
        </div>
        <div className="hero-content-wrapper">
          <p className="pre-headline">Hi! I'm a <span className="highlight">Full-Stack Developer</span></p>
          <h1 className="hero-name">Afshan Qasim</h1>
          <p className="hero-description">
            I'm a BS(IT) student with a deep focus on the MERN stack. My passion is building fast, scalable, and dynamic web applications that provide a great user experience.
          </p>
          <div className="hero-buttons">
            <a href="resume_afshan_qasim.pdf" download className="cta-button primary">Download CV</a>
            <a href="#contactus" className="cta-button secondary">Contact</a>
          </div>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/afshan-qasim-998917300?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/Afshan738" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/glitch_wraith135?utm_source=qr&igsh=MXZvNjg1bW0xY216Nw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://discord.gg/7tdyyhsy" target="_blank" rel="noopener noreferrer" aria-label="Discord Profile">
              <i className="fa-brands fa-discord"></i>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;