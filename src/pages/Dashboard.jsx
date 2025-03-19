// File: src/pages/Dashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { getPlacementStats } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);
  
  const stats = getPlacementStats();
  
  // Get current time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-1">{getGreeting()}, {currentUser?.name.split(' ')[0] || 'User'}</h4>
              <p className="text-muted mb-0">Welcome to SVIT College Placement Management System</p>
            </div>
            <div className="text-end d-none d-md-block">
              <h6 className="mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h6>
              <p className="text-muted mb-0">Academic Year: 2024-2025</p>
            </div>
          </div>
        </div>
      </div>
      
      <h5 className="mb-3">Placement Statistics</h5>
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <div className="card bg-white border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-people-fill text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted mb-0">Total Students</p>
                  <h3 className="mb-0 fw-bold">{stats.totalStudents}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <div className="card bg-white border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <i className="bi bi-check-circle-fill text-success fs-4"></i>
                </div>
                <div>
                  <p className="text-muted mb-0">Placed Students</p>
                  <h3 className="mb-0 fw-bold">{stats.placedStudents}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <div className="card bg-white border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <i className="bi bi-graph-up-arrow text-info fs-4"></i>
                </div>
                <div>
                  <p className="text-muted mb-0">Placement Rate</p>
                  <h3 className="mb-0 fw-bold">{stats.placementRate}%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
          <div className="card bg-white border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <i className="bi bi-currency-rupee text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted mb-0">Avg. Package (LPA)</p>
                  <h3 className="mb-0 fw-bold">{stats.avgPackage}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Placement Overview</h5>
              <Link to="/reports" className="btn btn-sm btn-outline-primary">View Reports</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Key Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Top Recruiting Company</td>
                      <td><span className="fw-medium">{stats.topCompany.name}</span> <span className="badge bg-info">{stats.topCompany.count} offers</span></td>
                    </tr>
                    <tr>
                      <td>Placement Status</td>
                      <td>
                        <div className="progress" style={{ height: '10px' }}>
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{ width: `${stats.placementRate}%` }} 
                            aria-valuenow={stats.placementRate} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small className="text-muted mt-1 d-block">
                          {stats.placedStudents} of {stats.totalStudents} students placed ({stats.placementRate}%)
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>Active Placement Offers</td>
                      <td>{stats.totalStudents - stats.placedStudents} students</td>
                    </tr>
                    <tr>
                      <td>Companies Visited</td>
                      <td>{stats.topCompany.name === 'None' ? 0 : 3} companies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Links</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <Link to="/reports" className="list-group-item list-group-item-action d-flex align-items-center">
                  <i className="bi bi-file-earmark-bar-graph text-primary fs-5 me-3"></i>
                  <div>
                    <h6 className="mb-0">Generate Reports</h6>
                    <small className="text-muted">Create and export placement reports</small>
                  </div>
                </Link>
                <Link to="/offers" className="list-group-item list-group-item-action d-flex align-items-center">
                  <i className="bi bi-briefcase text-success fs-5 me-3"></i>
                  <div>
                    <h6 className="mb-0">Manage Offers</h6>
                    <small className="text-muted">Track student placement offers</small>
                  </div>
                </Link>
                <Link to="/inputs" className="list-group-item list-group-item-action d-flex align-items-center">
                  <i className="bi bi-people text-info fs-5 me-3"></i>
                  <div>
                    <h6 className="mb-0">Student Management</h6>
                    <small className="text-muted">Manage student records and data</small>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h5 className="mb-3">Quick Actions</h5>
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-file-earmark-text fs-1 text-primary"></i>
              </div>
              <h5 className="card-title">Generate Reports</h5>
              <p className="card-text text-muted">
                Create detailed placement reports for students with filtering options
              </p>
              <Link to="/reports" className="btn btn-outline-primary">
                Go to Reports
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-briefcase fs-1 text-success"></i>
              </div>
              <h5 className="card-title">Manage Offers</h5>
              <p className="card-text text-muted">
                Track and manage placement offers for students from various companies
              </p>
              <Link to="/offers" className="btn btn-outline-success">
                Go to Offers
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-people fs-1 text-info"></i>
              </div>
              <h5 className="card-title">Student Management</h5>
              <p className="card-text text-muted">
                Manage student data and collect inputs from various stakeholders
              </p>
              <Link to="/inputs" className="btn btn-outline-info">
                Go to Students
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mt-2">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 me-3">
              <i className="bi bi-lightbulb text-warning fs-1"></i>
            </div>
            <div>
              <h5 className="mb-1">Quick Tips</h5>
              <p className="mb-0 text-muted">To get the most out of this system, regularly update student information, record all placement offers, and generate reports at the end of each placement cycle to track progress year over year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;