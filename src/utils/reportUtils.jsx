// File: src/utils/reportUtils.js
export const generatePredefinedReport = (
    reportType,
    students,
    offers,
    companies,
    branches,
    batches,
    generatePlacementReport
  ) => {
    let data = [];
    let title = "";
  
    switch (reportType) {
      case "highPackage":
        // High package offers (above 10 LPA)
        title = "High Package Offers (Above 10 LPA)";
        data = offers
          .filter((offer) => offer.package >= 10)
          .map((offer) => {
            const student = students.find((s) => s.id === offer.studentId) || {};
            return {
              studentId: student.id || "",
              studentName: student.name || "Unknown Student",
              rollNumber: student.rollNumber || "N/A",
              branch: student.branch || "N/A",
              batch: student.batch || "N/A",
              companyName: offer.companyName || "Unknown Company",
              role: offer.role || "N/A",
              package: offer.package || 0,
              offerDate: offer.offerDate || "N/A",
              status: offer.status || "N/A",
            };
          });
        break;
  
      case "branchWise":
        // Branch-wise placement statistics
        title = "Branch-wise Placement Statistics";
        const branchStats = {};
  
        // Initialize branch stats
        branches.forEach((branch) => {
          branchStats[branch] = {
            branch,
            totalStudents: 0,
            placed: 0,
            placementRate: 0,
            avgPackage: 0,
            highestPackage: 0,
            lowestPackage: 0,
          };
        });
  
        // Calculate branch-wise statistics
        students.forEach((student) => {
          if (branchStats[student.branch]) {
            branchStats[student.branch].totalStudents++;
  
            const studentOffers = offers.filter(
              (o) => o.studentId === student.id && o.status === "Accepted"
            );
  
            if (studentOffers.length > 0) {
              branchStats[student.branch].placed++;
  
              // Get highest package for this student
              const highestOffer = studentOffers.reduce(
                (max, offer) => (offer.package > max ? offer.package : max),
                0
              );
  
              // Update branch statistics
              branchStats[student.branch].avgPackage += highestOffer;
  
              if (highestOffer > branchStats[student.branch].highestPackage) {
                branchStats[student.branch].highestPackage = highestOffer;
              }
  
              if (
                branchStats[student.branch].lowestPackage === 0 ||
                highestOffer < branchStats[student.branch].lowestPackage
              ) {
                branchStats[student.branch].lowestPackage = highestOffer;
              }
            }
          }
        });
  
        // Calculate averages and percentages
        Object.keys(branchStats).forEach((branch) => {
          const stats = branchStats[branch];
  
          stats.placementRate =
            stats.totalStudents > 0
              ? ((stats.placed / stats.totalStudents) * 100).toFixed(2)
              : 0;
  
          stats.avgPackage =
            stats.placed > 0 ? (stats.avgPackage / stats.placed).toFixed(2) : 0;
        });
  
        data = Object.values(branchStats);
        break;
  
      case "companyWise":
        // Company-wise recruitment statistics
        title = "Company-wise Recruitment Statistics";
        const companyStats = {};
  
        // Initialize company stats
        companies.forEach((company) => {
          companyStats[company.name] = {
            companyName: company.name,
            industry: company.industry || 'N/A',
            offersExtended: 0,
            offersAccepted: 0,
            offersPending: 0,
            offersDeclined: 0,
            avgPackage: 0,
            highestPackage: 0,
            lowestPackage: Infinity,
          };
        });
  
        // Calculate company-wise statistics
        offers.forEach((offer) => {
          if (companyStats[offer.companyName]) {
            companyStats[offer.companyName].offersExtended++;
  
            if (offer.status === "Accepted") {
              companyStats[offer.companyName].offersAccepted++;
            } else if (offer.status === "Pending") {
              companyStats[offer.companyName].offersPending++;
            } else if (offer.status === "Declined") {
              companyStats[offer.companyName].offersDeclined++;
            }
  
            companyStats[offer.companyName].avgPackage += offer.package;
  
            if (offer.package > companyStats[offer.companyName].highestPackage) {
              companyStats[offer.companyName].highestPackage = offer.package;
            }
  
            if (offer.package < companyStats[offer.companyName].lowestPackage) {
              companyStats[offer.companyName].lowestPackage = offer.package;
            }
          }
        });
  
        // Calculate averages
        Object.keys(companyStats).forEach((company) => {
          const stats = companyStats[company];
  
          stats.avgPackage =
            stats.offersExtended > 0
              ? (stats.avgPackage / stats.offersExtended).toFixed(2)
              : 0;
  
          if (stats.lowestPackage === Infinity) {
            stats.lowestPackage = 0;
          }
        });
  
        data = Object.values(companyStats).filter(
          (stat) => stat.offersExtended > 0
        );
        break;
  
      case "batchWise":
        // Batch-wise placement statistics
        title = "Batch-wise Placement Statistics";
        const batchStats = {};
  
        // Initialize batch stats
        batches.forEach((batch) => {
          batchStats[batch] = {
            batch,
            totalStudents: 0,
            placed: 0,
            placementRate: 0,
            avgPackage: 0,
            highestPackage: 0,
          };
        });
  
        // Calculate batch-wise statistics
        students.forEach((student) => {
          if (batchStats[student.batch]) {
            batchStats[student.batch].totalStudents++;
  
            const studentOffers = offers.filter(
              (o) => o.studentId === student.id && o.status === "Accepted"
            );
  
            if (studentOffers.length > 0) {
              batchStats[student.batch].placed++;
  
              // Get highest package for this student
              const highestOffer = studentOffers.reduce(
                (max, offer) => (offer.package > max ? offer.package : max),
                0
              );
  
              // Update batch statistics
              batchStats[student.batch].avgPackage += highestOffer;
  
              if (highestOffer > batchStats[student.batch].highestPackage) {
                batchStats[student.batch].highestPackage = highestOffer;
              }
            }
          }
        });
  
        // Calculate averages and percentages
        Object.keys(batchStats).forEach((batch) => {
          const stats = batchStats[batch];
  
          stats.placementRate =
            stats.totalStudents > 0
              ? ((stats.placed / stats.totalStudents) * 100).toFixed(2)
              : 0;
  
          stats.avgPackage =
            stats.placed > 0 ? (stats.avgPackage / stats.placed).toFixed(2) : 0;
        });
  
        data = Object.values(batchStats);
        break;
  
      case "studentPerformance":
        // Student Performance Report (multiple offers, high packages)
        title = "Student Performance Report";
        const studentPerformance = [];
  
        students.forEach((student) => {
          const studentOffers = offers.filter((o) => o.studentId === student.id);
  
          if (studentOffers.length > 0) {
            const acceptedOffer = studentOffers.find(
              (o) => o.status === "Accepted"
            );
            const highestPackage = studentOffers.reduce(
              (max, offer) => (offer.package > max ? offer.package : max),
              0
            );
  
            studentPerformance.push({
              studentId: student.id || "",
              studentName: student.name || "Unknown Student",
              rollNumber: student.rollNumber || "N/A",
              branch: student.branch || "N/A",
              batch: student.batch || "N/A",
              offersReceived: studentOffers.length,
              highestPackage: highestPackage,
              acceptedPackage: acceptedOffer ? acceptedOffer.package : 0,
              acceptedCompany: acceptedOffer ? acceptedOffer.companyName : "None",
              status: acceptedOffer ? "Placed" : "Not Placed",
            });
          }
        });
  
        // Sort by offers received and then by highest package
        data = studentPerformance.sort((a, b) => {
          if (b.offersReceived !== a.offersReceived) {
            return b.offersReceived - a.offersReceived;
          }
          return b.highestPackage - a.highestPackage;
        });
        break;
  
      default:
        title = "All Placement Data";
        data = generatePlacementReport({}).map(item => ({
          ...item,
          rollNumber: item.rollNumber || 'N/A',
          companyName: item.companyName || 'Not Placed',
          role: item.role || 'N/A',
          package: item.package || 0,
          status: item.status || 'Not Placed'
        }));
    }
  
    return { data, title };
  };
  
  export const printReport = (reportData, reportTitle, activeTab, filters) => {
    if (reportData.length === 0) {
      alert("Please generate a report first");
      return;
    }
    
    // Open a new window for printing
    const printWindow = window.open('', '_blank', 'height=600,width=800');
    
    // Prepare table content based on report type
    let tableHeaders = '';
    let tableRows = '';
    
    if (activeTab === 'custom') {
      // Standard report with student and offer details
      tableHeaders = `
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
      `;
      
      tableRows = reportData.map(item => `
        <tr>
          <td>${item.rollNumber || 'N/A'}</td>
          <td>${item.studentName || 'N/A'}</td>
          <td>${item.branch || 'N/A'}</td>
          <td>${item.batch || 'N/A'}</td>
          <td>${item.companyName || 'N/A'}</td>
          <td>${item.role || 'N/A'}</td>
          <td>${parseFloat(item.package || 0).toFixed(1)}</td>
          <td>${item.status || 'N/A'}</td>
        </tr>
      `).join('');
    } else {
      // For predefined reports, dynamically create table based on data structure
      if (reportData.length > 0) {
        const firstItem = reportData[0];
        tableHeaders = `<tr>${
          Object.keys(firstItem).map(key => 
            `<th>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</th>`
          ).join('')
        }</tr>`;
        
        tableRows = reportData.map(item => {
          return `<tr>${
            Object.entries(item).map(([key, value]) => {
              if (value === null || value === undefined) return '<td>N/A</td>';
              
              if (typeof value === 'number') {
                if (key.toLowerCase().includes('package') || key.toLowerCase().includes('rate')) {
                  return `<td>${parseFloat(value).toFixed(1)}${key.toLowerCase().includes('rate') ? '%' : ''}</td>`;
                }
                return `<td>${value}</td>`;
              }
              
              return `<td>${value}</td>`;
            }).join('')
          }</tr>`;
        }).join('');
      }
    }
    
    // Write the report content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>${reportTitle} - SVIT College</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 20px; }
            h1 { text-align: center; color: #2c3e50; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #3498db; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f8f9fa; }
            tr:hover { background-color: #f1f1f1; }
            .report-info { margin-bottom: 20px; border: 1px solid #eee; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
            .report-info p { margin: 5px 0; }
            .print-date { text-align: right; font-size: 0.8em; color: #7f8c8d; margin-top: 10px; }
            .college-header { text-align: center; margin-bottom: 20px; }
            .college-name { font-size: 22px; font-weight: bold; margin: 0; color: #2c3e50; }
            .college-address { font-size: 14px; margin: 5px 0; color: #7f8c8d; }
            @media print {
              body { margin: 0.5cm; }
              h1 { font-size: 18pt; }
              .college-name { font-size: 16pt; }
              table, th, td { font-size: 10pt; }
              th { background-color: #3498db !important; color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              tr:nth-child(even) { background-color: #f8f9fa !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="college-header">
            <p class="college-name">SRI VENKATESWARA INSTITUTE OF TECHNOLOGY</p>
            <p class="college-address">Andhra Pradesh, South India</p>
          </div>
          
          <h1>${reportTitle}</h1>
          
          <div class="report-info">
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Academic Year:</strong> 2024-2025</p>
            <p><strong>Total Records:</strong> ${reportData.length}</p>
            ${activeTab === 'custom' ? `
              <p><strong>Branch:</strong> ${filters.branch || 'All'}</p>
              <p><strong>Batch:</strong> ${filters.batch || 'All'}</p>
              <p><strong>Company:</strong> ${filters.company || 'All'}</p>
              <p><strong>Status:</strong> ${filters.status || 'All'}</p>
              ${filters.packageAbove ? `<p><strong>Package Above:</strong> ${filters.packageAbove} LPA</p>` : ''}
              ${filters.packageBelow ? `<p><strong>Package Below:</strong> ${filters.packageBelow} LPA</p>` : ''}
            ` : ''}
          </div>
          
          <table>
            <thead>
              ${tableHeaders}
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          
          <div class="print-date">
            <p>Report generated by SVIT Placement Management System</p>
          </div>
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