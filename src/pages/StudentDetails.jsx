// File: src/pages/StudentDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const StudentDetails = () => {
  const { id } = useParams();
  const { 
    getStudent, 
    offers, 
    inputs
  } = useContext(DataContext);
  
  const [student, setStudent] = useState(null);
  const [studentOffers, setStudentOffers] = useState([]);
  const [studentInputs, setStudentInputs] = useState([]);
  
  useEffect(() => {
    if (id) {
      const studentData = getStudent(id);
      setStudent(studentData);
      
      // Get offers for this student
      const relatedOffers = offers.filter(offer => offer.studentId === id);
      setStudentOffers(relatedOffers);
      
      // Get inputs related to this student
      const relatedInputs = inputs.filter(input => input.studentId === id);
      setStudentInputs(relatedInputs);
    }
  }, [id, getStudent, offers, inputs]);
  
  if (!student) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading student data...</p>
      </div>
    );
  }
  
  return (
    <div className="student-details">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Profile</h2>
        <Link to="/inputs" className="btn btn-outline-primary">
          Back to Students
        </Link>
      </div>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}
                >
                  {student.name.charAt(0)}
                </div>
                <h4>{student.name}</h4>
                <p className="text-muted mb-0">{student.rollNumber}</p>
              </div>
              
              <hr/>
              
              <div className="mb-3">
                <h6 className="fw-bold">Branch</h6>
                <p>{student.branch}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="fw-bold">Batch</h6>
                <p>{student.batch}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="fw-bold">Email</h6>
                <p>{student.email}</p>
              </div>
              
              <div className="mb-3">
                <h6 className="fw-bold">Phone</h6>
                <p>{student.phone}</p>
              </div>
              
              <div className="d-grid">
                <Link 
                  to={`/offers?student=${student.id}`} 
                  className="btn btn-primary"
                >
                  Manage Offers
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Placement Status</h5>
            </div>
            <div className="card-body">
              {studentOffers.length > 0 ? (
                <>
                  <div className="alert alert-success mb-4">
                    <strong>Placement Status:</strong> {
                      studentOffers.some(offer => offer.status === 'Accepted') 
                        ? 'Placed' 
                        : 'Received Offers (Pending)'
                    }
                  </div>
                  
                  <h6 className="fw-bold mb-3">Offer Details</h6>
                  <div className="table-responsive">
                    <table className="table table-striped border">
                      <thead className="table-light">
                        <tr>
                          <th>Company</th>
                          <th>Role</th>
                          <th>Package (LPA)</th>
                          <th>Offer Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentOffers.map(offer => (
                          <tr key={offer.id}>
                            <td>{offer.companyName}</td>
                            <td>{offer.role}</td>
                            <td>{offer.package}</td>
                            <td>{offer.offerDate}</td>
                            <td>
                              <span className={`badge ${
                                offer.status === 'Accepted' ? 'bg-success' :
                                offer.status === 'Pending' ? 'bg-warning' :
                                'bg-danger'
                              }`}>
                                {offer.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="alert alert-secondary">
                  No placement offers recorded for this student yet.
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Input History</h5>
            </div>
            <div className="card-body">
              {studentInputs.length > 0 ? (
                <div className="timeline">
                  {studentInputs.map(input => (
                    <div key={input.id} className="timeline-item pb-4 mb-4 border-bottom">
                      <div className="d-flex">
                        <div 
                          className="rounded-circle bg-light border d-flex align-items-center justify-content-center me-3"
                          style={{ width: '40px', height: '40px', flexShrink: 0 }}
                        >
                          <i className="bi bi-chat-left-text"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{input.title}</h6>
                          <small className="text-muted">
                            {new Date(input.timestamp).toLocaleString()} by {input.submittedBy}
                          </small>
                          <p className="mt-2">{input.message}</p>
                          {input.attachment && (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                if (input.attachment && input.attachment.data) {
                                  const link = document.createElement('a');
                                  link.href = input.attachment.data;
                                  link.download = input.attachment.name;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }
                              }}
                            >
                              Download Attachment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-secondary">
                  No input history available for this student.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;