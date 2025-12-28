import React, { useState, useEffect } from 'react';
import '../App.css';

function SiteContentManagement() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    aboutHeadline: '',
    aboutDescription: '',
    aboutImageUrl: '',
    contactEmail: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  useEffect(() => {
    const fetchSiteContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/sitecontent');
        if (!response.ok) throw new Error('Failed to fetch site content');
        const data = await response.json();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSiteContent();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateContent = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setMessage("Error: You are not logged in.");
      return;
    }

    try {
      const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/sitecontent', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update content');
      }

      setMessage(`Successfully updated site content!`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  if (isLoading) {
    return <p>Loading site content...</p>;
  }

  return (
    <div>
      <h2 className="title">Manage Site Content</h2>
      <form onSubmit={handleUpdateContent}>
        <div>
          <label htmlFor="aboutHeadline">About Headline</label>
          <input id="aboutHeadline" name="aboutHeadline" type="text" value={formData.aboutHeadline} onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="aboutDescription">About Description</label>
          <textarea id="aboutDescription" name="aboutDescription" value={formData.aboutDescription} onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="aboutImageUrl">About Image URL</label>
          <input id="aboutImageUrl" name="aboutImageUrl" type="text" value={formData.aboutImageUrl} onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="contactEmail">Contact Email</label>
          <input id="contactEmail" name="contactEmail" type="text" value={formData.contactEmail} onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="linkedinUrl">LinkedIn URL</label>
          <input id="linkedinUrl" name="linkedinUrl" type="text" value={formData.linkedinUrl} onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="githubUrl">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" type="text" value={formData.githubUrl} onChange={handleFormChange} />
        </div>
        <button type="submit">Update Site Content</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default SiteContentManagement;