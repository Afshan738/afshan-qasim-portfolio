import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import './Skills.css';
import { API_URL } from '../config';
function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${ API_URL }/api/skills`);
        if (!response.ok) {
          throw new Error('Skills data could not be fetched.');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch skills:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="skills-title"
        >
          My Tech Stack & Skills
        </motion.h2>
        
        {isLoading && <p className="loading-message">Loading skills...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!isLoading && !error && (
          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {skills.map((skill) => (
              <motion.div key={skill._id} className="skill-card" variants={itemVariants}>
                {skill.iconUrl && (
                  <img src={skill.iconUrl} alt={`${skill.name} icon`} className="skill-icon" />
                )}
                <div className="skill-details">
                  <span className="skill-category">{skill.category}</span>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Skills;