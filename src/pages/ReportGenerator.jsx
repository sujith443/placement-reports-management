// File: src/pages/ReportGenerator.js
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

const ReportGenerator = () => {
  const { 
    students, 
    companies, 
    generatePlacementReport, 
    exportReportToCSV 
  } = useContext(DataContext);

  const [filters, setFilters] = useState({
    branch: '',
    batch: '',
    company: 'All',
    status: ''
  });

  const [reportData, setReportData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Get unique branches
  const branches = [...new Set(students.map(student => student.branch))];
  
  // Get unique batches
  const batches = [...new Set(students.map(student => student.batch))];
  
  // Get all company names plus "All" option
  const companyNames = ['All', ...companies.map(company => company.name)];
  
  // Status options
  const statusOptions = ['All', 'Accepted', 'Pending', 'Declined', 'Not Placed'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const generateReport = () => {
    setIsGenerating(true);
    
    // Prepare filters (remove 'All' values)
    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'All') {
        activeFilters[key] = filters[key];
      }
    });
    
    // Generate report with filters
    const data = generatePlacementReport(activeFilters);
    setReportData(data);
    
    setIsGenerating(false);
  };

  const handleExport = () => {
    if (reportData.length === 0) {
      alert('Please generate a report first');
      return;
    }
    
    const csvUrl = exportReportToCSV(reportData);
    
    if (csvUrl) {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = csvUrl;
      link.setAttribute('download', `placement_report_${new Date().toLocaleDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(csvUrl), 100);
    }
  };

  const printReport = () => {
    if (reportData.length === 0) {
      alert('Please generate a report first');
      return;
    }
    
    // Open a new window for printing
    const printWindow = window.open('', '_blank', 'height=600,width=800');
    
    // Write the report content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Placement Report - SVIT College</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #0056b3; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #0056b3; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .report-info { margin-bottom: 20px; }
            .print-date { text-align: right; font-size: 0.8em; color: #666; }
            @media print {
              body { margin: 0.5cm; }
              h1 { font-size: 14pt; }
              table, th, td { font-size: 9pt; }
            }
          </style>
        </head>
        <body>
          <h1>Placement Report - SVIT College</h1>
          <div class="report-info">
            <p><strong>Branch:</strong> ${filters.branch || 'All'}</p>
            <p><strong>Batch:</strong> ${filters.batch || 'All'}</p>
            <p><strong>Company:</strong> ${filters.company || 'All'}</p>
            <p><strong>Status:</strong> ${filters.status || 'All'}</p>
          </div>
          <div class="print-date">
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>Company</th>
                <th>Role</th>
                <th>Package (LPA)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${reportData.map(item => `
                <tr>
                  <td>${item.rollNumber}</td>
                  <td>${item.studentName}</td>
                  <td>${item.branch}</td>
                  <td>${item.batch}</td>
                  <td>${item.companyName}</td>
                  <td>${item.role}</td>
                  <td>${item.package}</td>
                  <td>${item.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    
    // Trigger print dialog
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  return (
    <div className="report-generator">
      <h2 className="mb-4">Generate Placement Reports</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Report Filters</h5>
          
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="branch" className="form-label">Branch</label>
              <select
                id="branch"
                name="branch"
                className="form-select"
                value={filters.branch}
                onChange={handleFilterChange}
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="batch" className="form-label">Batch</label>
              <select
                id="batch"
                name="batch"
                className="form-select"
                value={filters.batch}
                onChange={handleFilterChange}
              >
                <option value="">All Batches</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <select
                id="company"
                name="company"
                className="form-select"
                value={filters.company}
                onChange={handleFilterChange}
              >
                {companyNames.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={generateReport}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>
      
      {reportData.length > 0 && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Report Results</h5>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleExport}
                >
                  Export CSV
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={printReport}
                >
                  Print Report
                </button>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Branch</th>
                    <th>Batch</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Package (LPA)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.rollNumber}</td>
                      <td>{item.studentName}</td>
                      <td>{item.branch}</td>
                      <td>{item.batch}</td>
                      <td>{item.companyName}</td>
                      <td>{item.role}</td>
                      <td>{item.package}</td>
                      <td>
                        <span className={`badge ${
                          item.status === 'Accepted' ? 'bg-success' :
                          item.status === 'Pending' ? 'bg-warning' :
                          item.status === 'Declined' ? 'bg-danger' :
                          'bg-secondary'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-3">
              <p className="text-muted">
                Total {reportData.length} record(s) found
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;