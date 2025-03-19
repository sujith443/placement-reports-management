// File: src/pages/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card login-card">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="d-inline-block rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3" 
                  style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <h3 className="card-title">SVIT Placement Portal</h3>
                <p className="text-muted">Sign in to manage student placements</p>
              </div>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      className="input-group-text bg-light" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="alert alert-info py-2">
                    <small>
                      <i className="bi bi-info-circle me-1"></i>
                      Demo credentials: <strong>admin / admin123</strong>
                    </small>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-3 text-muted">
            <small>© {new Date().getFullYear()} SVIT College Placement Cell, Andhra Pradesh</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;