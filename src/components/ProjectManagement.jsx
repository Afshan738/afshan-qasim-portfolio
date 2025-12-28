import React, { useState, useEffect } from 'react';
import '../App.css';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

// handling the form changes 🤔
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, title: '', description: '', imageUrl: '', projectUrl: '', githubUrl: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");
    const isUpdating = !!formData.id;
    const url = isUpdating 
      ? `https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/projects/${formData.id}` 
      : 'https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/projects';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          projectUrl: formData.projectUrl,
          githubUrl: formData.githubUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Failed to ${isUpdating ? 'update' : 'create'} project`);

      setMessage(`Successfully ${isUpdating ? 'updated' : 'created'} project: "${data.title}"`);
      clearForm();
      fetchProjects(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };
  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }
    
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    try {
      const response = await fetch(`https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Afshan ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete project');
      
      setMessage(data.msg || "Project deleted successfully.");
      fetchProjects(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      id: project._id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
    });
    window.scrollTo(0, 0); 
  };

  return (
    <div>
      <h2 className="title">Manage Projects</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{formData.id ? 'Edit Project' : 'Add New Project'}</h3>
        <input name="id" type="hidden" value={formData.id || ''} />
        <div><label htmlFor="title">Title</label><input id="title" name="title" type="text" value={formData.title} onChange={handleFormChange} required /></div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleFormChange} required /></div>
        <div><label htmlFor="imageUrl">Image URL</label><input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleFormChange} /></div>
        <div><label htmlFor="projectUrl">Project URL</label><input id="projectUrl" name="projectUrl" type="text" value={formData.projectUrl} onChange={handleFormChange} /></div>
        <div><label htmlFor="githubUrl">GitHub URL</label><input id="githubUrl" name="githubUrl" type="text" value={formData.githubUrl} onChange={handleFormChange} /></div>
        <button type="submit">{formData.id ? 'Update Project' : 'Create Project'}</button>
        {formData.id && <button type="button" onClick={clearForm} style={{marginTop: '0.5rem', backgroundColor: '#64748b'}}>Cancel Edit</button>}
        {message && <p>{message}</p>}
      </form>

      <hr />

      <h3>Existing Projects</h3>
      {isLoading ? <p>Loading projects...</p> : (
        <div style={{ width: '100%' }}>
          {projects.map((project) => (
            <div key={project._id} className="list-item">
              <span>{project.title}</span>
              <div className="list-item-buttons">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectManagement;