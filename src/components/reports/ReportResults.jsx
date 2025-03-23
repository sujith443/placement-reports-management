// File: src/components/reports/ReportResults.js
import React from "react";

const ReportResults = ({
  reportData,
  reportTitle,
  activeTab,
  filters,
  handleExport,
  handlePrint,
}) => {
  return (
    <div className="card">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{reportTitle}</h5>
          <span className="badge bg-primary">{reportData.length} records</span>
        </div>
      </div>

      {/* Report Header Section */}
      <div className="card-body border-bottom pb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h6 className="text-muted mb-2">Report Details</h6>
            <p className="mb-1">
              <strong>Generated on:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="mb-1">
              <strong>Report Type:</strong>{" "}
              {activeTab === "custom" ? "Custom Report" : "Predefined Report"}
            </p>
            {activeTab === "custom" && (
              <div className="mt-2">
                <p className="mb-1 small">
                  <strong>Filters Applied:</strong>{" "}
                  {Object.entries(filters)
                    .filter(([key, value]) => value && value !== "All")
                    .map(
                      ([key, value]) =>
                        `${
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }: ${value}`
                    )
                    .join(", ") || "None"}
                </p>
              </div>
            )}
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <button className="btn btn-success me-2" onClick={handleExport}>
              <i className="bi bi-file-earmark-excel me-2"></i>
              Export CSV
            </button>
            <button className="btn btn-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-2"></i>
              Print Report
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              {activeTab === "custom" ? (
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
              ) : (
                <tr>
                  {reportData.length > 0 &&
                    Object.keys(reportData[0]).map((key, index) => (
                      <th key={index}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </th>
                    ))}
                </tr>
              )}
            </thead>
            <tbody>
              {activeTab === "custom" ? (
                reportData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="fw-medium">
                        {item.rollNumber || "N/A"}
                      </span>
                    </td>
                    <td>{item.studentName || "N/A"}</td>
                    <td>{item.branch || "N/A"}</td>
                    <td>{item.batch || "N/A"}</td>
                    <td>
                      {item.companyName === "Not Placed" ? (
                        <span className="text-muted">Not Placed</span>
                      ) : (
                        <span className="fw-medium">{item.companyName}</span>
                      )}
                    </td>
                    <td>{item.role || "N/A"}</td>
                    <td>
                      {item.package ? (
                        <span
                          className={`fw-medium ${
                            parseFloat(item.package) >= 10
                              ? "text-success"
                              : ""
                          }`}
                        >
                          {parseFloat(item.package).toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-muted">0.0</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "Accepted"
                            ? "bg-success"
                            : item.status === "Pending"
                            ? "bg-warning"
                            : item.status === "Declined"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                reportData.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item).map(([key, value], valIndex) => (
                      <td key={valIndex}>
                        {typeof value === "boolean" ? (
                          value ? (
                            "Yes"
                          ) : (
                            "No"
                          )
                        ) : typeof value === "number" ? (
                          key.toLowerCase().includes("package") ||
                          key.toLowerCase().includes("rate") ? (
                            <span
                              className={
                                parseFloat(value) >= 10
                                  ? "text-success fw-medium"
                                  : ""
                              }
                            >
                              {parseFloat(value).toFixed(1)}
                              {key.toLowerCase().includes("rate") ? "%" : ""}
                            </span>
                          ) : (
                            value
                          )
                        ) : value !== undefined ? (
                          value
                        ) : (
                          "N/A"
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* No data message */}
        {reportData.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-file-earmark-x text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No data found</h5>
            <p className="text-muted">Try adjusting your filters or select a different report type.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportResults;