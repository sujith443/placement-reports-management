// File: src/components/reports/PredefinedReportsTab.js
import React from "react";

const PredefinedReportsTab = ({ generatePredefinedReport, isGenerating }) => {
  return (
    <div>
      <h5 className="mb-3">Predefined Reports</h5>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-building text-primary fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">Branch-wise Statistics</h5>
                  <p className="card-text text-muted mb-0">
                    Performance across departments
                  </p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                Analyze placement performance across different branches with
                detailed statistics.
              </p>
              <button
                className="btn btn-outline-primary"
                onClick={() => generatePredefinedReport("branchWise")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <i className="bi bi-briefcase text-success fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">Company-wise Recruitment</h5>
                  <p className="card-text text-muted mb-0">
                    Hiring patterns by company
                  </p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                View detailed statistics about companies' recruitment patterns
                and package trends.
              </p>
              <button
                className="btn btn-outline-success"
                onClick={() => generatePredefinedReport("companyWise")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <i className="bi bi-calendar-check text-info fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">Batch-wise Statistics</h5>
                  <p className="card-text text-muted mb-0">
                    Year-over-year performance
                  </p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                Compare placement performance across different batches over the
                years.
              </p>
              <button
                className="btn btn-outline-info"
                onClick={() => generatePredefinedReport("batchWise")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <i className="bi bi-currency-rupee text-warning fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">High Package Offers</h5>
                  <p className="card-text text-muted mb-0">
                    Premium packages above 10 LPA
                  </p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                Students with high package offers (above 10 LPA) across all
                branches.
              </p>
              <button
                className="btn btn-outline-warning"
                onClick={() => generatePredefinedReport("highPackage")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                  <i className="bi bi-graph-up-arrow text-danger fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">Student Performance</h5>
                  <p className="card-text text-muted mb-0">
                    Multiple offers and choices
                  </p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                Detailed report on student performance in placements, including
                multiple offers.
              </p>
              <button
                className="btn btn-outline-danger"
                onClick={() => generatePredefinedReport("studentPerformance")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-secondary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-file-earmark-spreadsheet text-secondary fs-4"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">Complete Placement Data</h5>
                  <p className="card-text text-muted mb-0">All placement records</p>
                </div>
              </div>
              <p className="card-text text-muted mb-3">
                Comprehensive report of all placement data without any filters.
              </p>
              <button
                className="btn btn-outline-secondary"
                onClick={() => generatePredefinedReport("all")}
                disabled={isGenerating}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredefinedReportsTab;