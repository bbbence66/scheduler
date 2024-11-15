import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ManagementNav.css';

function ManagementNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="management-nav">
      <button 
        className={`nav-button ${location.pathname === '/task-management' ? 'active' : ''}`}
        onClick={() => navigate('/task-management')}
      >
        Task Management
      </button>
      <button 
        className={`nav-button ${location.pathname === '/user-management' ? 'active' : ''}`}
        onClick={() => navigate('/user-management')}
      >
        User Management
      </button>
      <button 
        className="nav-button"
        onClick={() => navigate('/')}
      >
        Back to Calendar
      </button>
    </div>
  );
}

export default ManagementNav; 