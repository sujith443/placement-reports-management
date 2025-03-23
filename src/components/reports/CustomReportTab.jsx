// File: src/components/reports/CustomReportTab.js
import React from "react";

const CustomReportTab = ({
  filters,
  handleFilterChange,
  generateCustomReport,
  isGenerating,
  branches,
  batches,
  companyNames,
  statusOptions,
}) => {
  return (
    <div>
      <h5 className="mb-3">Custom Report Filters</h5>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="branch" className="form-label">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            className="form-select"
            value={filters.branch}
            onChange={handleFilterChange}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="batch" className="form-label">
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            className="form-select"
            value={filters.batch}
            onChange={handleFilterChange}
          >
            <option value="">All Batches</option>
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <select
            id="company"
            name="company"
            className="form-select"
            value={filters.company}
            onChange={handleFilterChange}
          >
            {companyNames.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="packageAbove" className="form-label">
            Package Above (LPA)
          </label>
          <input
            type="number"
            id="packageAbove"
            name="packageAbove"
            className="form-control"
            value={filters.packageAbove}
            onChange={handleFilterChange}
            placeholder="Min package"
            min="0"
            step="0.1"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="packageBelow" className="form-label">
            Package Below (LPA)
          </label>
          <input
            type="number"
            id="packageBelow"
            name="packageBelow"
            className="form-control"
            value={filters.packageBelow}
            onChange={handleFilterChange}
            placeholder="Max package"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={generateCustomReport}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Generating...
            </>
          ) : (
            <>
              <i className="bi bi-file-earmark-text me-2"></i>
              Generate Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomReportTab;