import React, { useState } from 'react';
import './Contact.css'; 

function Contact() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    messageBody: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/contactmessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }
      
      setMessage('Thank you! Your message has been sent successfully.');
      setFormData({ senderName: '', senderEmail: '', messageBody: '' }); 
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contactus" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to connect? I'd love to hear from you.
        </p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="senderName">Your Name</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senderEmail">Your Email</label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="messageBody">Message</label>
            <textarea
              id="messageBody"
              name="messageBody"
              rows="5"
              value={formData.messageBody}
              onChange={handleFormChange}
              required
            ></textarea>
          </div>
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {message && <p className="feedback-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;