// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReportGenerator from './pages/ReportGenerator';
import OfferManagement from './pages/OfferManagement';
import InputCollection from './pages/InputCollection';
import StudentDetails from './pages/StudentDetails';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1 py-4">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/reports" element={
                    <PrivateRoute>
                      <ReportGenerator />
                    </PrivateRoute>
                  } />
                  <Route path="/offers" element={
                    <PrivateRoute>
                      <OfferManagement />
                    </PrivateRoute>
                  } />
                  <Route path="/inputs" element={
                    <PrivateRoute>
                      <InputCollection />
                    </PrivateRoute>
                  } />
                  <Route path="/students/:id" element={
                    <PrivateRoute>
                      <StudentDetails />
                    </PrivateRoute>
                  } />
                </Routes>
              </div>
            </main>
            <footer className="py-3 mt-auto bg-light">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted mb-0 small">© {new Date().getFullYear()} SVIT College - Placement Management System</p>
                  <div className="text-muted small">
                    Andhra Pradesh, South India
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;