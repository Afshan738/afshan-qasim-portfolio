import React, { useState, useEffect } from 'react';
import './Service.css'; 

function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/services');
        if (!response.ok) {
          throw new Error('Services data could not be fetched.');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch services:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []); 
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="services-title">What I Offer</h2>
        {isLoading && <p className="loading-message">Loading services...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!isLoading && !error && (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;