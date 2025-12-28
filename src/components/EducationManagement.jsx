import React, { useState, useEffect } from 'react';
import '../App.css';

function EducationManagement() {
  const [educations, setEducations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    id: null,
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, institution: '', degree: '', startDate: '', endDate: '', description: '' });
  };

  const fetchEducation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/education');
      if (!response.ok) throw new Error('Failed to fetch education history');
      const data = await response.json();
      setEducations(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    const isUpdating = !!formData.id;
    const url = isUpdating ? `https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/education/${formData.id}` : 'https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/education';
    const method = isUpdating ? 'PUT' : 'POST';
    const bodyData = { ...formData };
    if (bodyData.startDate) bodyData.startDate = new Date(bodyData.startDate).toISOString();
    if (bodyData.endDate) bodyData.endDate = new Date(bodyData.endDate).toISOString();

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Failed to ${isUpdating ? 'update' : 'create'} education entry`);

      setMessage(`Successfully ${isUpdating ? 'updated' : 'created'} education entry.`);
      clearForm();
      fetchEducation();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (educationId) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    try {
      const response = await fetch(`https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/education/${educationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete entry');
      
      setMessage(data.msg || "Education entry deleted successfully.");
      fetchEducation();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleEdit = (education) => {
    const formattedStartDate = education.startDate ? new Date(education.startDate).toISOString().split('T')[0] : '';
    const formattedEndDate = education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : '';

    setFormData({
      id: education._id,
      institution: education.institution,
      degree: education.degree,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      description: education.description || '',
    });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="title">Manage Education</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{formData.id ? 'Edit Education' : 'Add New Education'}</h3>
        <div><label htmlFor="institution">Institution</label><input id="institution" name="institution" type="text" value={formData.institution} onChange={handleFormChange} required /></div>
        <div><label htmlFor="degree">Degree</label><input id="degree" name="degree" type="text" value={formData.degree} onChange={handleFormChange} required /></div>
        <div><label htmlFor="startDate">Start Date</label><input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleFormChange} required /></div>
        <div><label htmlFor="endDate">End Date (Optional)</label><input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleFormChange} /></div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleFormChange} /></div>
        <button type="submit">{formData.id ? 'Update Entry' : 'Add Entry'}</button>
        {formData.id && <button type="button" onClick={clearForm} style={{marginTop: '0.5rem', backgroundColor: '#64748b'}}>Cancel Edit</button>}
        {message && <p>{message}</p>}
      </form>
      <hr />
      <h3>Existing Education History</h3>
      {isLoading ? <p>Loading history...</p> : (
        <div style={{ width: '100%' }}>
          {educations.map((edu) => (
            <div key={edu._id} className="list-item">
              <span><strong>{edu.degree}</strong> at {edu.institution}</span>
              <div className="list-item-buttons">
                <button onClick={() => handleEdit(edu)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(edu._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationManagement;