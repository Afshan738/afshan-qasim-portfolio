import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 
import PortfolioPage from './pages/PortfolioPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default App;