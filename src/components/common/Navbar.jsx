// File: src/components/common/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1]; // Get the first part of the path
    setActiveLink(path || 'dashboard');
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <i className="bi bi-mortarboard-fill me-2"></i>
          SVIT Placement
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`} 
                to="/dashboard"
              >
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'reports' ? 'active' : ''}`} 
                to="/reports"
              >
                <i className="bi bi-file-earmark-bar-graph me-1"></i> Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'offers' ? 'active' : ''}`} 
                to="/offers"
              >
                <i className="bi bi-briefcase me-1"></i> Offers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'inputs' ? 'active' : ''}`} 
                to="/inputs"
              >
                <i className="bi bi-people me-1"></i> Students
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button 
                className="btn btn-outline-light d-flex align-items-center" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <div className="me-2 rounded-circle bg-white text-primary d-flex align-items-center justify-content-center" 
                  style={{ width: '30px', height: '30px', fontSize: '1rem' }}>
                  {currentUser?.name?.charAt(0) || 'U'}
                </div>
                <span className="d-none d-md-inline">{currentUser?.name || 'User'}</span>
                <i className="bi bi-chevron-down ms-2 small"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><span className="dropdown-item-text text-muted small">Role: {currentUser?.role || 'User'}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;