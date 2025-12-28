import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import './Project.css'; 

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/projects');
        if (!response.ok) {
          throw new Error('Projects data could not be fetched.');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2 
          className="projects-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        
        {isLoading && <p className="loading-message">Loading projects...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!isLoading && !error && (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id} 
                className="project-card"
                initial={{ opacity: 0, y: 100 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: index * 0.15 
                }}
              >
                <a href={project.projectUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-image-link">
                  <img src={project.imageUrl} alt={project.title} className="project-image" />
                </a>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-links">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;