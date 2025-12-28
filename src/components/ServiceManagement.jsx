import React, { useState, useEffect } from 'react';
import '../App.css';

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
  });
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://portfolio-backend-two-olive.vercel.app/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, name: '', description: '' });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    const isUpdating = !!formData.id;
    const url = isUpdating ? `https://portfolio-backend-two-olive.vercel.app/api/services/${formData.id}` : 'https://portfolio-backend-two-olive.vercel.app//api/services';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`, 
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Failed to ${isUpdating ? 'update' : 'create'} service`);

      setMessage(`Successfully ${isUpdating ? 'updated' : 'created'} service: "${data.name}"`);
      clearForm();
      fetchServices(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };
  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    try {
      const response = await fetch(`https://portfolio-backend-two-olive.vercel.app/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Afshan ${token}` }, 
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete service');
      
      setMessage(data.msg || "Service deleted successfully.");
      fetchServices(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };
  const handleEdit = (service) => {
    setFormData({
      id: service._id,
      name: service.name,
      description: service.description,
    });
    window.scrollTo(0, 0); 
  };

  return (
    <div>
      <h2 className="title">Manage Services</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{formData.id ? 'Edit Service' : 'Add New Service'}</h3>
        <div>
          <label htmlFor="name">Service Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} required />
        </div>
        <button type="submit">{formData.id ? 'Update Service' : 'Add Service'}</button>
        {formData.id && <button type="button" onClick={clearForm} style={{marginTop: '0.5rem', backgroundColor: '#64748b'}}>Cancel Edit</button>}
        {message && <p>{message}</p>}
      </form>

      <hr />

      <h3>Existing Services</h3>
      {isLoading ? <p>Loading services...</p> : (
        <div style={{ width: '100%' }}>
          {services.map((service) => (
            <div key={service._id} className="list-item">
              <span>{service.name}</span>
              <div className="list-item-buttons">
                <button onClick={() => handleEdit(service)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(service._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceManagement;