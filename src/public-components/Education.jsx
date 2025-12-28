import React, { useState, useEffect } from 'react';
import './Education.css'; 

function Education() {
  const [educationHistory, setEducationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/education');
        if (!response.ok) {
          throw new Error('Education data could not be fetched.');
        }
        const data = await response.json();
        setEducationHistory(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch education:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducation();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <h2 className="education-title">My Education</h2>
        
        {isLoading && <p className="loading-message">Loading history...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!isLoading && !error && (
          <div className="education-timeline">
            {educationHistory.map((edu) => (
              <div key={edu._id} className="timeline-item">
                <div className="timeline-content">
                  <h3 className="degree">{edu.degree}</h3>
                  <p className="institution">{edu.institution}</p>
                  <p className="description">{edu.description}</p>
                  <time className="dates">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;