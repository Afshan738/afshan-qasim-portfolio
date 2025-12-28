import React, { useState, useEffect } from 'react';
import '../App.css';

function SkillManagement() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({//here firstly  i have set everything as null at fisrt state form is empty
    id: null,
    name: '',
    category: '',
    iconUrl: '',
    description: ''
  });
  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/skills');
      if (!response.ok) throw new Error('Failed to fetch skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, name: '', category: '', iconUrl: '', description: '' });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    const isUpdating = !!formData.id;
    const url = isUpdating ? `https://portfolio-backend-two-olive.vercel.app/api/skills/${formData.id}` : 'https://portfolio-backend-two-olive.vercel.app//api/skills';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`, 
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          iconUrl: formData.iconUrl,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Operation failed');

      setMessage(`Successfully ${isUpdating ? 'updated' : 'created'} skill: "${data.name}"`);
      clearForm();
      fetchSkills();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    try {
      const response = await fetch(`https://portfolio-backend-two-olive.vercel.app/api/skills/${skillId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Afshan ${token}` },e
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete skill');
      
      setMessage(data.msg || "Skill deleted successfully.");
      fetchSkills(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

 
  const handleEdit = (skill) => {
    setFormData({
      id: skill._id,
      name: skill.name,
      category: skill.category || '',
      iconUrl: skill.iconUrl || '',
      description: skill.description || '',
    });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="title">Manage Skills</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{formData.id ? 'Edit Skill' : 'Add New Skill'}</h3>
        <div><label htmlFor="name">Name</label><input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} required /></div>
        <div><label htmlFor="category">Category</label><input id="category" name="category" type="text" value={formData.category} onChange={handleFormChange} /></div>
        <div><label htmlFor="iconUrl">Icon URL</label><input id="iconUrl" name="iconUrl" type="text" value={formData.iconUrl} onChange={handleFormChange} /></div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleFormChange} /></div>
        <button type="submit">{formData.id ? 'Update Skill' : 'Add Skill'}</button>
        {formData.id && <button type="button" onClick={clearForm} style={{marginTop: '0.5rem', backgroundColor: '#64748b'}}>Cancel Edit</button>}
        {message && <p>{message}</p>}
      </form>
      <hr />
      <h3>Existing Skills</h3>
      {isLoading ? <p>Loading skills...</p> : (
        <div style={{ width: '100%' }}>
          {skills.map((skill) => (
            <div key={skill._id} className="list-item">
              <span>{skill.name} ({skill.category})</span>
              <div className="list-item-buttons">
                <button onClick={() => handleEdit(skill)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(skill._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillManagement;