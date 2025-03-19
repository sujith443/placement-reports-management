// File: src/pages/OfferManagement.js
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

const OfferManagement = () => {
  const { 
    students, 
    offers, 
    companies, 
    addOffer, 
    updateOffer, 
    deleteOffer, 
    addCompany 
  } = useContext(DataContext);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: '',
    companyName: '',
    role: '',
    package: '',
    offerDate: '',
    status: 'Pending',
    offerLetter: null
  });
  
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    industry: '',
    contact: ''
  });

  // Initialize filtered offers
  useEffect(() => {
    setFilteredOffers(offers);
  }, [offers]);

  // Filter offers based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOffers(offers);
      return;
    }
    
    const lowercasedTerm = searchTerm.toLowerCase();
    
    const results = offers.filter(offer => {
      const student = students.find(s => s.id === offer.studentId) || {};
      
      return (
        student.name?.toLowerCase().includes(lowercasedTerm) ||
        student.rollNumber?.toLowerCase().includes(lowercasedTerm) ||
        offer.companyName.toLowerCase().includes(lowercasedTerm) ||
        offer.role.toLowerCase().includes(lowercasedTerm)
      );
    });
    
    setFilteredOffers(results);
  }, [searchTerm, offers, students]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCompanyFormChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value
    });
  };

  const handleOfferLetterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to base64 for storage in localStorage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({
          ...formData,
          offerLetter: {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result
          }
        });
      };
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      companyName: '',
      role: '',
      package: '',
      offerDate: '',
      status: 'Pending',
      offerLetter: null
    });
    setEditingId(null);
  };
  
  const resetCompanyForm = () => {
    setCompanyFormData({
      name: '',
      industry: '',
      contact: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.studentId || !formData.companyName || !formData.role || !formData.package) {
      alert('Please fill all required fields');
      return;
    }
    
    // Convert package to number
    const offerData = {
      ...formData,
      package: parseFloat(formData.package)
    };
    
    if (editingId) {
      // Update existing offer
      updateOffer(editingId, offerData);
    } else {
      // Add new offer
      addOffer(offerData);
    }
    
    // Reset form and close it
    resetForm();
    setShowForm(false);
  };
  
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!companyFormData.name || !companyFormData.industry) {
      alert('Please fill all required fields');
      return;
    }
    
    // Add new company
    addCompany(companyFormData);
    
    // Reset form and close it
    resetCompanyForm();
    setShowCompanyForm(false);
    
    // Update form data with new company
    setFormData({
      ...formData,
      companyName: companyFormData.name
    });
  };

  const handleEdit = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      setFormData({
        studentId: offer.studentId,
        companyName: offer.companyName,
        role: offer.role,
        package: offer.package,
        offerDate: offer.offerDate,
        status: offer.status,
        offerLetter: offer.offerLetter
      });
      setEditingId(offerId);
      setShowForm(true);
    }
  };

  const handleDelete = (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      deleteOffer(offerId);
    }
  };
  
  const handleViewOfferLetter = (offerLetter) => {
    if (offerLetter && offerLetter.data) {
      // Open offer letter in new tab
      const newWindow = window.open();
      newWindow.document.write(`
        <iframe src="${offerLetter.data}" width="100%" height="100%" style="border: none;"></iframe>
      `);
    } else {
      alert('No offer letter available');
    }
  };

  return (
    <div className="offer-management">
      <h2 className="mb-4">Manage Placement Offers</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              Add New Offer
            </button>
          </div>
          
          {/* Offers Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Student</th>
                  <th>Roll Number</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Package (LPA)</th>
                  <th>Offer Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.length > 0 ? (
                  filteredOffers.map(offer => {
                    const student = students.find(s => s.id === offer.studentId) || {};
                    return (
                      <tr key={offer.id}>
                        <td>{student.name || 'Unknown'}</td>
                        <td>{student.rollNumber || 'N/A'}</td>
                        <td>{offer.companyName}</td>
                        <td>{offer.role}</td>
                        <td>{offer.package}</td>
                        <td>{offer.offerDate}</td>
                        <td>
                          <span className={`badge ${
                            offer.status === 'Accepted' ? 'bg-success' :
                            offer.status === 'Pending' ? 'bg-warning' :
                            offer.status === 'Declined' ? 'bg-danger' :
                            'bg-secondary'
                          }`}>
                            {offer.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-info"
                              onClick={() => handleEdit(offer.id)}
                            >
                              Edit
                            </button>
                            {offer.offerLetter && (
                              <button
                                className="btn btn-secondary"
                                onClick={() => handleViewOfferLetter(offer.offerLetter)}
                              >
                                View Letter
                              </button>
                            )}
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(offer.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No offers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Offer Form */}
      {showForm && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">
              {editingId ? 'Edit Offer' : 'Add New Offer'}
            </h5>
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="studentId" className="form-label">Student</label>
                  <select
                    id="studentId"
                    name="studentId"
                    className="form-select"
                    value={formData.studentId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="companyName" className="form-label">Company</label>
                  <div className="input-group">
                    <select
                      id="companyName"
                      name="companyName"
                      className="form-select"
                      value={formData.companyName}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCompanyForm(true)}
                    >
                      Add New
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="role" className="form-label">Job Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="package" className="form-label">Package (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    id="package"
                    name="package"
                    className="form-control"
                    value={formData.package}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="offerDate" className="form-label">Offer Date</label>
                  <input
                    type="date"
                    id="offerDate"
                    name="offerDate"
                    className="form-control"
                    value={formData.offerDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="offerLetter" className="form-label">Offer Letter (PDF)</label>
                <input
                  type="file"
                  id="offerLetter"
                  name="offerLetter"
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  onChange={handleOfferLetterChange}
                />
                {formData.offerLetter && (
                  <div className="mt-2">
                    <span className="text-success">
                      File attached: {formData.offerLetter.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Offer' : 'Add Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Company Form (Modal-like) */}
      {showCompanyForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add New Company</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowCompanyForm(false)}
              ></button>
            </div>
            <div className="card-body">
              <form onSubmit={handleCompanySubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Company Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={companyFormData.name}
                    onChange={handleCompanyFormChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="industry" className="form-label">Industry</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    className="form-control"
                    value={companyFormData.industry}
                    onChange={handleCompanyFormChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact Email</label>
                  <input
                    type="email"
                    id="contact"
                    name="contact"
                    className="form-control"
                    value={companyFormData.contact}
                    onChange={handleCompanyFormChange}
                  />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      resetCompanyForm();
                      setShowCompanyForm(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManagement;