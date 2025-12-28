import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import ProjectManagement from '../components/ProjectManagement';
import SkillManagement from '../components/SkillManagement';
import EducationManagement from '../components/EducationManagement';
import CertificateManagement from '../components/CertificateManagement';
import SiteContentManagement from '../components/SiteContentManagement';
import ContactMessageManagement from '../components/ContactMessageManagement';
import ServiceManagement from "../components/ServiceManagement";

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg)' }}>
     
      <aside style={{ width: '250px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Dashboard</h2>
        <nav style={{ flex: 1, marginTop: '2rem' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/projects" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Projects
              </Link>
            </li>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/skills" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Skills
              </Link>
            </li>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/education" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Education
              </Link>
            </li>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/certificates" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Certificates
              </Link>
            </li>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/site-content" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Site Content
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/services" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Services
              </Link>
            </li>
            
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/admin/messages" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', padding: '0.75rem 1rem', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-glass)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Messages
              </Link>
            </li>
            
          </ul>
        </nav>
        <div>
          <button onClick={handleLogout} style={{ width: '100%' }}>
            Logout
          </button>
        </div>
      </aside>

      
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Routes>
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="skills" element={<SkillManagement />} />
          <Route path="education" element={<EducationManagement />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="site-content" element={<SiteContentManagement />} />
          
         
          <Route path="services" element={<ServiceManagement />} />

          <Route path="messages" element={<ContactMessageManagement />} />
          
          <Route index element={<h2 className="title">Welcome, Afshan Qasim! Select a section to manage.</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default DashboardLayout;