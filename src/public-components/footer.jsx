

import React, { useState, useEffect } from 'react';
import './footer.css'; 

function Footer() {
  const [socials, setSocials] = useState({
    linkedinUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/sitecontent');
        if (!response.ok) return;
        const data = await response.json();
        const content = Array.isArray(data) ? data[0] : data;
        if (content) {
          setSocials({
            linkedinUrl: content.linkedinUrl,
            githubUrl: content.githubUrl,
          });
        }
      } catch (error) {
        console.error("Failed to fetch social links for footer:", error);
      }
    };
    fetchSocials();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-socials">
          {socials.githubUrl && (
            <a href={socials.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {socials.linkedinUrl && (
            <a href={socials.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Afshan Qasim. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;