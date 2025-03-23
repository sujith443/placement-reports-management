// File: src/pages/ReportGenerator.js
import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import CustomReportTab from "../components/reports/CustomReportTab";
import PredefinedReportsTab from "../components/reports/PredefinedReportsTab";
import ReportResults from "../components/reports/ReportResults";
import { generatePredefinedReport, printReport } from "../utils/reportUtils";

const ReportGenerator = () => {
  const {
    students,
    companies,
    offers,
    generatePlacementReport,
    exportReportToCSV,
  } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState("custom");
  const [filters, setFilters] = useState({
    branch: "",
    batch: "",
    company: "All",
    status: "",
    packageAbove: "",
    packageBelow: "",
  });

  const [reportData, setReportData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportTitle, setReportTitle] = useState("Custom Placement Report");

  // Get unique branches
  const branches = [...new Set(students.map((student) => student.branch))];

  // Get unique batches
  const batches = [...new Set(students.map((student) => student.batch))];

  // Get all company names plus "All" option
  const companyNames = ["All", ...companies.map((company) => company.name)];

  // Status options
  const statusOptions = [
    "All",
    "Accepted",
    "Pending",
    "Declined",
    "Not Placed",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const generateCustomReport = () => {
    setIsGenerating(true);
    setReportTitle("Custom Placement Report");

    // Prepare filters (remove 'All' values)
    const activeFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key] !== "All") {
        activeFilters[key] = filters[key];
      }
    });

    // Generate report with filters
    let data = generatePlacementReport(activeFilters);

    // Apply package filters if provided
    if (filters.packageAbove) {
      data = data.filter(
        (item) => item.package >= parseFloat(filters.packageAbove)
      );
    }

    if (filters.packageBelow) {
      data = data.filter(
        (item) => item.package <= parseFloat(filters.packageBelow)
      );
    }

    // Ensure all data has been properly populated
    data = data.map(item => ({
      ...item,
      rollNumber: item.rollNumber || 'N/A',
      companyName: item.companyName || 'Not Placed',
      role: item.role || 'N/A',
      package: item.package || 0
    }));

    setReportData(data);
    setIsGenerating(false);
  };

  const handleGeneratePredefinedReport = (reportType) => {
    setIsGenerating(true);
    const { data, title } = generatePredefinedReport(
      reportType,
      students,
      offers,
      companies,
      branches,
      batches,
      generatePlacementReport
    );
    setReportTitle(title);
    setReportData(data);
    setIsGenerating(false);
  };

  const handleExport = () => {
    if (reportData.length === 0) {
      alert("Please generate a report first");
      return;
    }

    const csvUrl = exportReportToCSV(reportData);

    if (csvUrl) {
      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute(
        "download",
        `${reportTitle
          .replace(/\s+/g, "_")
          .toLowerCase()}_${new Date().toLocaleDateString()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(csvUrl), 100);
    }
  };

  const handlePrintReport = () => {
    printReport(reportData, reportTitle, activeTab, filters);
  };

  return (
    <div className="report-generator">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Generate Placement Reports</h2>
        <div>
          {reportData.length > 0 && (
            <>
              <button className="btn btn-success me-2" onClick={handleExport}>
                <i className="bi bi-file-earmark-excel me-2"></i>
                Export CSV
              </button>
              <button className="btn btn-primary" onClick={handlePrintReport}>
                <i className="bi bi-printer me-2"></i>
                Print Report
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <ul className="nav nav-tabs" id="reportTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "custom" ? "active" : ""}`}
                onClick={() => setActiveTab("custom")}
              >
                <i className="bi bi-sliders me-2"></i>
                Custom Report
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "predefined" ? "active" : ""
                }`}
                onClick={() => setActiveTab("predefined")}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                Predefined Reports
              </button>
            </li>
          </ul>

          <div className="tab-content pt-4">
            {/* Custom Report Tab */}
            {activeTab === "custom" && (
              <CustomReportTab
                filters={filters}
                handleFilterChange={handleFilterChange}
                generateCustomReport={generateCustomReport}
                isGenerating={isGenerating}
                branches={branches}
                batches={batches}
                companyNames={companyNames}
                statusOptions={statusOptions}
              />
            )}

            {/* Predefined Reports Tab */}
            {activeTab === "predefined" && (
              <PredefinedReportsTab
                generatePredefinedReport={handleGeneratePredefinedReport}
                isGenerating={isGenerating}
              />
            )}
          </div>
        </div>
      </div>

      {/* Report Results */}
      {reportData.length > 0 && (
        <ReportResults
          reportData={reportData}
          reportTitle={reportTitle}
          activeTab={activeTab}
          filters={filters}
          handleExport={handleExport}
          handlePrint={handlePrintReport}
        />
      )}
    </div>
  );
};

export default ReportGenerator;