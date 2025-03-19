// File: src/context/DataContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const DataContext = createContext();

// Sample initial data (in a real app, this would be empty)
const initialStudents = localStorage.getItem('students') 
  ? JSON.parse(localStorage.getItem('students')) 
  : [
    {
      id: '1',
      name: 'Rahul Sharma',
      rollNumber: 'SVIT20CS001',
      branch: 'Computer Science',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
      batch: '2020-2024'
    },
    {
      id: '2',
      name: 'Priya Patel',
      rollNumber: 'SVIT20EC015',
      branch: 'Electronics',
      email: 'priya.patel@example.com',
      phone: '9876543211',
      batch: '2020-2024'
    }
  ];

const initialOffers = localStorage.getItem('offers') 
  ? JSON.parse(localStorage.getItem('offers')) 
  : [
    {
      id: '1',
      studentId: '1',
      companyName: 'TCS',
      role: 'Software Engineer',
      package: 7.5,
      offerDate: '2023-12-10',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '2',
      studentId: '2',
      companyName: 'Infosys',
      role: 'Systems Engineer',
      package: 6.5,
      offerDate: '2023-11-25',
      status: 'Pending',
      offerLetter: null
    }
  ];

const initialCompanies = localStorage.getItem('companies') 
  ? JSON.parse(localStorage.getItem('companies')) 
  : [
    {
      id: '1',
      name: 'TCS',
      industry: 'IT Services',
      contact: 'hr@tcs.com'
    },
    {
      id: '2',
      name: 'Infosys',
      industry: 'IT Services',
      contact: 'careers@infosys.com'
    },
    {
      id: '3',
      name: 'Wipro',
      industry: 'IT Services',
      contact: 'recruitment@wipro.com'
    }
  ];

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);
  const [offers, setOffers] = useState(initialOffers);
  const [companies, setCompanies] = useState(initialCompanies);
  const [inputs, setInputs] = useState([]);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('inputs', JSON.stringify(inputs));
  }, [inputs]);

  // Student CRUD operations
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now().toString(),
    };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, ...updatedData } : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    // Also delete associated offers
    setOffers(offers.filter(offer => offer.studentId !== id));
  };

  const getStudent = (id) => {
    return students.find(student => student.id === id);
  };

  // Offer CRUD operations
  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: Date.now().toString(),
    };
    setOffers([...offers, newOffer]);
    return newOffer;
  };

  const updateOffer = (id, updatedData) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, ...updatedData } : offer
    ));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  // Company CRUD operations
  const addCompany = (company) => {
    const newCompany = {
      ...company,
      id: Date.now().toString(),
    };
    setCompanies([...companies, newCompany]);
    return newCompany;
  };

  const updateCompany = (id, updatedData) => {
    setCompanies(companies.map(company => 
      company.id === id ? { ...company, ...updatedData } : company
    ));
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  // Input collection operations
  const addInput = (input) => {
    const newInput = {
      ...input,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setInputs([...inputs, newInput]);
    return newInput;
  };

  // Generate reports
  const generatePlacementReport = (filters = {}) => {
    let reportData = [];
    
    students.forEach(student => {
      const studentOffers = offers.filter(offer => offer.studentId === student.id);
      
      if (studentOffers.length > 0) {
        studentOffers.forEach(offer => {
          const company = companies.find(c => c.name === offer.companyName);
          
          reportData.push({
            studentId: student.id,
            studentName: student.name,
            rollNumber: student.rollNumber,
            branch: student.branch,
            batch: student.batch,
            companyName: offer.companyName,
            companyIndustry: company ? company.industry : 'Unknown',
            role: offer.role,
            package: offer.package,
            offerDate: offer.offerDate,
            status: offer.status
          });
        });
      } else {
        reportData.push({
          studentId: student.id,
          studentName: student.name,
          rollNumber: student.rollNumber,
          branch: student.branch,
          batch: student.batch,
          companyName: 'Not Placed',
          companyIndustry: 'N/A',
          role: 'N/A',
          package: 0,
          offerDate: 'N/A',
          status: 'Not Placed'
        });
      }
    });
    
    // Apply filters if any
    if (filters.branch) {
      reportData = reportData.filter(item => item.branch === filters.branch);
    }
    
    if (filters.batch) {
      reportData = reportData.filter(item => item.batch === filters.batch);
    }
    
    if (filters.company && filters.company !== 'All') {
      reportData = reportData.filter(item => item.companyName === filters.company);
    }
    
    if (filters.status) {
      reportData = reportData.filter(item => item.status === filters.status);
    }
    
    return reportData;
  };

  // Calculate placement statistics
  const getPlacementStats = () => {
    const totalStudents = students.length;
    const placedStudents = new Set(
      offers.filter(o => o.status === 'Accepted').map(o => o.studentId)
    ).size;
    
    const placementRate = totalStudents > 0 
      ? ((placedStudents / totalStudents) * 100).toFixed(2) 
      : 0;
    
    // Calculate average package
    let totalPackage = 0;
    let offersCount = 0;
    
    offers.forEach(offer => {
      if (offer.status === 'Accepted') {
        totalPackage += offer.package;
        offersCount++;
      }
    });
    
    const avgPackage = offersCount > 0 
      ? (totalPackage / offersCount).toFixed(2) 
      : 0;
    
    // Get company with highest offers
    const companyOffers = {};
    offers.forEach(offer => {
      companyOffers[offer.companyName] = (companyOffers[offer.companyName] || 0) + 1;
    });
    
    let topCompany = { name: 'None', count: 0 };
    
    Object.keys(companyOffers).forEach(company => {
      if (companyOffers[company] > topCompany.count) {
        topCompany = { name: company, count: companyOffers[company] };
      }
    });
    
    return {
      totalStudents,
      placedStudents,
      placementRate,
      avgPackage,
      topCompany
    };
  };

  // Export report to CSV
  const exportReportToCSV = (reportData) => {
    if (!reportData || reportData.length === 0) return null;
    
    const headers = Object.keys(reportData[0]).join(',');
    const rows = reportData.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    return url;
  };

  return (
    <DataContext.Provider
      value={{
        students,
        offers,
        companies,
        inputs,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        addOffer,
        updateOffer,
        deleteOffer,
        addCompany,
        updateCompany,
        deleteCompany,
        addInput,
        generatePlacementReport,
        getPlacementStats,
        exportReportToCSV
      }}
    >
      {children}
    </DataContext.Provider>
  );
};