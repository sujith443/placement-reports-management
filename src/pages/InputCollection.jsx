// File: src/pages/InputCollection.js
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

const InputCollection = () => {
  const { 
    students, 
    companies, 
    addStudent, 
    updateStudent, 
    deleteStudent,
    inputs,
    addInput
  } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('students');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    rollNumber: '',
    branch: '',
    email: '',
    phone: '',
    batch: ''
  });
  
  const [feedbackFormData, setFeedbackFormData] = useState({
    type: 'student',
    title: '',
    message: '',
    studentId: '',
    companyId: '',
    attachment: null
  });

  // Initialize filtered students
  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
      return;
    }
    
    const lowercasedTerm = searchTerm.toLowerCase();
    
    const results = students.filter(student => 
      student.name.toLowerCase().includes(lowercasedTerm) ||
      student.rollNumber.toLowerCase().includes(lowercasedTerm) ||
      student.branch.toLowerCase().includes(lowercasedTerm) ||
      student.email.toLowerCase().includes(lowercasedTerm)
    );
    
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({
      ...studentFormData,
      [name]: value
    });
  };
  
  const handleFeedbackFormChange = (e) => {
    const { name, value } = e.target;
    setFeedbackFormData({
      ...feedbackFormData,
      [name]: value
    });
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert file to base64 for storage in localStorage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFeedbackFormData({
          ...feedbackFormData,
          attachment: {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result
          }
        });
      };
    }
  };

  const resetStudentForm = () => {
    setStudentFormData({
      name: '',
      rollNumber: '',
      branch: '',
      email: '',
      phone: '',
      batch: ''
    });
    setEditingStudentId(null);
  };
  
  const resetFeedbackForm = () => {
    setFeedbackFormData({
      type: 'student',
      title: '',
      message: '',
      studentId: '',
      companyId: '',
      attachment: null
    });
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!studentFormData.name || !studentFormData.rollNumber || !studentFormData.branch) {
      alert('Please fill all required fields');
      return;
    }
    
    if (editingStudentId) {
      // Update existing student
      updateStudent(editingStudentId, studentFormData);
    } else {
      // Add new student
      addStudent(studentFormData);
    }
    
    // Reset form and close it
    resetStudentForm();
    setShowStudentForm(false);
  };
  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!feedbackFormData.title || !feedbackFormData.message) {
      alert('Please fill all required fields');
      return;
    }
    
    // Add timestamp and user info
    const inputData = {
      ...feedbackFormData,
      submittedBy: currentUser.name,
      submittedByRole: currentUser.role,
      timestamp: new Date().toISOString()
    };
    
    // Add input
    addInput(inputData);
    
    // Reset form and close it
    resetFeedbackForm();
    setShowFeedbackForm(false);
    
    // Show success message
    alert('Input submitted successfully');
  };

  const handleEditStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setStudentFormData({
        name: student.name,
        rollNumber: student.rollNumber,
        branch: student.branch,
        email: student.email,
        phone: student.phone,
        batch: student.batch
      });
      setEditingStudentId(studentId);
      setShowStudentForm(true);
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };
  
  // Function to convert base64 to downloadable file
  const handleDownloadAttachment = (attachment) => {
    if (attachment && attachment.data) {
      const link = document.createElement('a');
      link.href = attachment.data;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="input-collection">
      <h2 className="mb-4">Data Collection & Management</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Manage Students
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'inputs' ? 'active' : ''}`}
            onClick={() => setActiveTab('inputs')}
          >
            Inputs & Feedback
          </button>
        </li>
      </ul>
      
      {/* Students Management Tab */}
      {activeTab === 'students' && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group w-50">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search students..."
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
                    resetStudentForm();
                    setShowStudentForm(true);
                  }}
                >
                  Add New Student
                </button>
              </div>
              
              {/* Students Table */}
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Branch</th>
                      <th>Batch</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.rollNumber}</td>
                          <td>{student.branch}</td>
                          <td>{student.batch}</td>
                          <td>{student.email}</td>
                          <td>{student.phone}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-info"
                                onClick={() => handleEditStudent(student.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Add/Edit Student Form */}
          {showStudentForm && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  {editingStudentId ? 'Edit Student' : 'Add New Student'}
                </h5>
                
                <form onSubmit={handleStudentSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={studentFormData.name}
                        onChange={handleStudentFormChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                      <input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        className="form-control"
                        value={studentFormData.rollNumber}
                        onChange={handleStudentFormChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="branch" className="form-label">Branch</label>
                      <select
                        id="branch"
                        name="branch"
                        className="form-select"
                        value={studentFormData.branch}
                        onChange={handleStudentFormChange}
                        required
                      >
                        <option value="">Select Branch</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrical">Electrical</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="batch" className="form-label">Batch</label>
                      <select
                        id="batch"
                        name="batch"
                        className="form-select"
                        value={studentFormData.batch}
                        onChange={handleStudentFormChange}
                        required
                      >
                        <option value="">Select Batch</option>
                        <option value="2019-2023">2019-2023</option>
                        <option value="2020-2024">2020-2024</option>
                        <option value="2021-2025">2021-2025</option>
                        <option value="2022-2026">2022-2026</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={studentFormData.email}
                        onChange={handleStudentFormChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={studentFormData.phone}
                        onChange={handleStudentFormChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => {
                        resetStudentForm();
                        setShowStudentForm(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingStudentId ? 'Update Student' : 'Add Student'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Inputs & Feedback Tab */}
      {activeTab === 'inputs' && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Inputs & Feedback Collection</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    resetFeedbackForm();
                    setShowFeedbackForm(true);
                  }}
                >
                  Submit New Input
                </button>
              </div>
              
              <p className="text-muted">
                This section allows administrators, faculty, and placement officers to submit various inputs, 
                feedback, or important information related to the placement process.
              </p>
              
              {/* Inputs & Feedback Table */}
              <div className="table-responsive mt-4">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Submitted By</th>
                      <th>Related To</th>
                      <th>Attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputs.length > 0 ? (
                      inputs.map(input => {
                        let relatedTo = 'N/A';
                        
                        if (input.studentId) {
                          const student = students.find(s => s.id === input.studentId);
                          relatedTo = student ? `Student: ${student.name}` : 'Unknown Student';
                        } else if (input.companyId) {
                          const company = companies.find(c => c.id === input.companyId);
                          relatedTo = company ? `Company: ${company.name}` : 'Unknown Company';
                        }
                        
                        return (
                          <tr key={input.id}>
                            <td>{new Date(input.timestamp).toLocaleDateString()}</td>
                            <td>{input.type.charAt(0).toUpperCase() + input.type.slice(1)}</td>
                            <td>{input.title}</td>
                            <td>
                              {input.submittedBy} 
                              <span className="badge bg-secondary ms-1">
                                {input.submittedByRole}
                              </span>
                            </td>
                            <td>{relatedTo}</td>
                            <td>
                              {input.attachment ? (
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleDownloadAttachment(input.attachment)}
                                >
                                  Download
                                </button>
                              ) : (
                                'No Attachment'
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No inputs or feedback found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Submit Feedback/Input Form */}
          {showFeedbackForm && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Submit New Input</h5>
                
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">Input Type</label>
                    <select
                      id="type"
                      name="type"
                      className="form-select"
                      value={feedbackFormData.type}
                      onChange={handleFeedbackFormChange}
                      required
                    >
                      <option value="student">Student Feedback</option>
                      <option value="company">Company Information</option>
                      <option value="placement">Placement Process</option>
                      <option value="general">General Input</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={feedbackFormData.title}
                      onChange={handleFeedbackFormChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="4"
                      value={feedbackFormData.message}
                      onChange={handleFeedbackFormChange}
                      required
                    ></textarea>
                  </div>
                  
                  {(feedbackFormData.type === 'student' || feedbackFormData.type === 'placement') && (
                    <div className="mb-3">
                      <label htmlFor="studentId" className="form-label">Related Student (Optional)</label>
                      <select
                        id="studentId"
                        name="studentId"
                        className="form-select"
                        value={feedbackFormData.studentId}
                        onChange={handleFeedbackFormChange}
                      >
                        <option value="">Select Student (Optional)</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.rollNumber})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {(feedbackFormData.type === 'company' || feedbackFormData.type === 'placement') && (
                    <div className="mb-3">
                      <label htmlFor="companyId" className="form-label">Related Company (Optional)</label>
                      <select
                        id="companyId"
                        name="companyId"
                        className="form-select"
                        value={feedbackFormData.companyId}
                        onChange={handleFeedbackFormChange}
                      >
                        <option value="">Select Company (Optional)</option>
                        {companies.map(company => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment (Optional)</label>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      className="form-control"
                      onChange={handleAttachmentChange}
                    />
                    {feedbackFormData.attachment && (
                      <div className="mt-2">
                        <span className="text-success">
                          File attached: {feedbackFormData.attachment.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => {
                        resetFeedbackForm();
                        setShowFeedbackForm(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Input
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InputCollection;