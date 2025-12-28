import React, { useState, useEffect } from 'react';
import '../App.css';

function CertificateManagement() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    issuingOrganization: '',
    dateIssued: '',
    certificateUrl: '',
    description: ''
  });

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/certificates');
      if (!response.ok) throw new Error('Failed to fetch certificates');
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setFormData({ id: null, title: '', issuingOrganization: '', dateIssued: '', certificateUrl: '', description: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    const isUpdating = !!formData.id;
    const url = isUpdating ? `https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/certificates/${formData.id}` : 'https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/certificates';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Afshan ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          issuingOrganization: formData.issuingOrganization,
          dateIssued: formData.dateIssued,
          certificateUrl: formData.certificateUrl,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Operation failed');

      setMessage(`Successfully ${isUpdating ? 'updated' : 'created'} certificate.`);
      clearForm();
      fetchCertificates();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (certificateId) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    
    setMessage('');
    const token = localStorage.getItem('adminToken');
    if (!token) return setMessage("Error: You are not logged in.");

    try {
      const response = await fetch(`https://portfolio-backend-1jrzu97zs-afshan738s-projects.vercel.app/api/certificates/${certificateId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Afshan ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete certificate');
      
      setMessage(data.msg || "Certificate deleted successfully.");
      fetchCertificates();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

 
  const handleEdit = (cert) => {
    const formattedDate = cert.dateIssued ? new Date(cert.dateIssued).toISOString().split('T')[0] : '';

    setFormData({
      id: cert._id,
      title: cert.title,
      issuingOrganization: cert.issuingOrganization,
      dateIssued: formattedDate,
      certificateUrl: cert.certificateUrl || '',
      description: cert.description || '',
    });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="title">Manage Certificates</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>{formData.id ? 'Edit Certificate' : 'Add New Certificate'}</h3>
        <div><label htmlFor="title">Title</label><input id="title" name="title" type="text" value={formData.title} onChange={handleFormChange} required /></div>
        <div><label htmlFor="issuingOrganization">Issuing Organization</label><input id="issuingOrganization" name="issuingOrganization" type="text" value={formData.issuingOrganization} onChange={handleFormChange} required /></div>
        <div><label htmlFor="dateIssued">Date Issued</label><input id="dateIssued" name="dateIssued" type="date" value={formData.dateIssued} onChange={handleFormChange} /></div>
        <div><label htmlFor="certificateUrl">Certificate URL</label><input id="certificateUrl" name="certificateUrl" type="text" value={formData.certificateUrl} onChange={handleFormChange} /></div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleFormChange} /></div>
        <button type="submit">{formData.id ? 'Update Certificate' : 'Add Certificate'}</button>
        {formData.id && <button type="button" onClick={clearForm} style={{marginTop: '0.5rem', backgroundColor: '#64748b'}}>Cancel Edit</button>}
        {message && <p>{message}</p>}
      </form>
      <hr />
      <h3>Existing Certificates</h3>
      {isLoading ? <p>Loading certificates...</p> : (
        <div style={{ width: '100%' }}>
          {certificates.map((cert) => (
            <div key={cert._id} className="list-item">
              <span>{cert.title}</span>
              <div className="list-item-buttons">
                <button onClick={() => handleEdit(cert)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(cert._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateManagement;