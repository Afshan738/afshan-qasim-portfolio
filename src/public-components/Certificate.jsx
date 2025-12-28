import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import './Certificate.css'; 

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/certificates');
        if (!response.ok) {
          throw new Error('Certificates data could not be fetched.');
        }
        const data = await response.json();
        setCertificates(data);
      } catch (err){
        setError(err.message);
        console.error("Failed to fetch certificates:", err);
      } finally{
        setIsLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-container">
        <motion.h2 
          className="certificates-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Certifications & Training
        </motion.h2>
        
        {isLoading && <p className="loading-message">Loading certificates...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!isLoading && !error && (
          <div className="certificates-list">
            {certificates.map((cert, index) => (
              <motion.div 
                key={cert._id} 
                className="certificate-item"
                initial={{ opacity: 0, x: 100 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
              >
                <div className="certificate-content">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="issuing-org">{cert.issuingOrganization}</p>
                </div>
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                    View Credential
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;