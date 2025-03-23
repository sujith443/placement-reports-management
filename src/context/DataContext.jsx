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
      rollNumber: 'SVIT20CS101',
      branch: 'Computer Science',
      email: 'rahul.sharma@svit.edu.in',
      phone: '9876543210',
      batch: '2020-2024'
    },
    {
      id: '2',
      name: 'Priya Patel',
      rollNumber: 'SVIT20EC115',
      branch: 'Electronics',
      email: 'priya.patel@svit.edu.in',
      phone: '9876543211',
      batch: '2020-2024'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      rollNumber: 'SVIT20ME122',
      branch: 'Mechanical',
      email: 'amit.kumar@svit.edu.in',
      phone: '9876543212',
      batch: '2020-2024'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      rollNumber: 'SVIT21CS118',
      branch: 'Computer Science',
      email: 'sneha.reddy@svit.edu.in',
      phone: '9876543213',
      batch: '2021-2025'
    },
    {
      id: '5',
      name: 'Vijay Singh',
      rollNumber: 'SVIT21EE105',
      branch: 'Electrical',
      email: 'vijay.singh@svit.edu.in',
      phone: '9876543214',
      batch: '2021-2025'
    },
    {
      id: '6',
      name: 'Ananya Gupta',
      rollNumber: 'SVIT21CV112',
      branch: 'Civil',
      email: 'ananya.gupta@svit.edu.in',
      phone: '9876543215',
      batch: '2021-2025'
    },
    {
      id: '7',
      name: 'Karthik Nair',
      rollNumber: 'SVIT22CS108',
      branch: 'Computer Science',
      email: 'karthik.nair@svit.edu.in',
      phone: '9876543216',
      batch: '2022-2026'
    },
    {
      id: '8',
      name: 'Deepa Menon',
      rollNumber: 'SVIT22EC130',
      branch: 'Electronics',
      email: 'deepa.menon@svit.edu.in',
      phone: '9876543217',
      batch: '2022-2026'
    },
    {
      id: '9',
      name: 'Ravi Verma',
      rollNumber: 'SVIT20CS114',
      branch: 'Computer Science',
      email: 'ravi.verma@svit.edu.in',
      phone: '9876543218',
      batch: '2020-2024'
    },
    {
      id: '10',
      name: 'Lakshmi Prasad',
      rollNumber: 'SVIT20ME109',
      branch: 'Mechanical',
      email: 'lakshmi.prasad@svit.edu.in',
      phone: '9876543219',
      batch: '2020-2024'
    },
    {
      id: '11',
      name: 'Aditya Nayak',
      rollNumber: 'SVIT21CS103',
      branch: 'Computer Science',
      email: 'aditya.nayak@svit.edu.in',
      phone: '9876543220',
      batch: '2021-2025'
    },
    {
      id: '12',
      name: 'Pooja Hegde',
      rollNumber: 'SVIT21EE111',
      branch: 'Electrical',
      email: 'pooja.hegde@svit.edu.in',
      phone: '9876543221',
      batch: '2021-2025'
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
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '3',
      studentId: '3',
      companyName: 'Wipro',
      role: 'Project Engineer',
      package: 5.8,
      offerDate: '2023-11-15',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '4',
      studentId: '1',
      companyName: 'Infosys',
      role: 'Digital Specialist Engineer',
      package: 8.0,
      offerDate: '2023-12-12',
      status: 'Declined',
      offerLetter: null
    },
    {
      id: '5',
      studentId: '4',
      companyName: 'Accenture',
      role: 'Associate Software Engineer',
      package: 7.2,
      offerDate: '2023-10-20',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '6',
      studentId: '5',
      companyName: 'Capgemini',
      role: 'Analyst',
      package: 6.8,
      offerDate: '2023-09-15',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '7',
      studentId: '6',
      companyName: 'TCS',
      role: 'Assistant Systems Engineer',
      package: 7.0,
      offerDate: '2023-10-05',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '8',
      studentId: '4',
      companyName: 'Microsoft',
      role: 'Software Development Engineer',
      package: 16.0,
      offerDate: '2023-11-30',
      status: 'Pending',
      offerLetter: null
    },
    {
      id: '9',
      studentId: '2',
      companyName: 'TCS',
      role: 'Digital Engineer',
      package: 8.5,
      offerDate: '2023-12-01',
      status: 'Declined',
      offerLetter: null
    },
    {
      id: '10',
      studentId: '7',
      companyName: 'Google',
      role: 'Associate Product Developer',
      package: 18.5,
      offerDate: '2024-01-15',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '11',
      studentId: '9',
      companyName: 'Amazon',
      role: 'Software Development Engineer',
      package: 14.5,
      offerDate: '2023-12-05',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '12',
      studentId: '10',
      companyName: 'Mahindra',
      role: 'Graduate Engineer Trainee',
      package: 6.0,
      offerDate: '2023-11-20',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '13',
      studentId: '8',
      companyName: 'LTI Mindtree',
      role: 'Associate Engineer',
      package: 6.5,
      offerDate: '2023-12-15',
      status: 'Pending',
      offerLetter: null
    },
    {
      id: '14',
      studentId: '11',
      companyName: 'HCL Technologies',
      role: 'Software Engineer',
      package: 7.0,
      offerDate: '2024-01-10',
      status: 'Pending',
      offerLetter: null
    },
    {
      id: '15',
      studentId: '12',
      companyName: 'Schneider Electric',
      role: 'Graduate Engineer Trainee',
      package: 5.9,
      offerDate: '2023-12-20',
      status: 'Accepted',
      offerLetter: null
    },
    {
      id: '16',
      studentId: '9',
      companyName: 'Cognizant',
      role: 'Programmer Analyst',
      package: 6.8,
      offerDate: '2023-11-28',
      status: 'Declined',
      offerLetter: null
    },
    {
      id: '17',
      studentId: '3',
      companyName: 'Larsen & Toubro',
      role: 'Graduate Engineer Trainee',
      package: 6.2,
      offerDate: '2023-10-25',
      status: 'Declined',
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
      contact: 'campus.connect@tcs.com'
    },
    {
      id: '2',
      name: 'Infosys',
      industry: 'IT Services',
      contact: 'campus.relations@infosys.com'
    },
    {
      id: '3',
      name: 'Wipro',
      industry: 'IT Services',
      contact: 'campus.recruitment@wipro.com'
    },
    {
      id: '4',
      name: 'Accenture',
      industry: 'IT Consulting',
      contact: 'campus.hiring@accenture.com'
    },
    {
      id: '5',
      name: 'Capgemini',
      industry: 'IT Consulting',
      contact: 'campus.careers@capgemini.com'
    },
    {
      id: '6',
      name: 'Microsoft',
      industry: 'Software',
      contact: 'university.recruit@microsoft.com'
    },
    {
      id: '7',
      name: 'Google',
      industry: 'Technology',
      contact: 'university.recruiting@google.com'
    },
    {
      id: '8',
      name: 'Amazon',
      industry: 'Technology',
      contact: 'university.hire@amazon.com'
    },
    {
      id: '9',
      name: 'HCL Technologies',
      industry: 'IT Services',
      contact: 'campus.careers@hcl.com'
    },
    {
      id: '10',
      name: 'Cognizant',
      industry: 'IT Services',
      contact: 'campus.connect@cognizant.com'
    },
    {
      id: '11',
      name: 'LTI Mindtree',
      industry: 'IT Services',
      contact: 'campus.hiring@ltimindtree.com'
    },
    {
      id: '12',
      name: 'Mahindra',
      industry: 'Manufacturing',
      contact: 'campus.careers@mahindra.com'
    },
    {
      id: '13',
      name: 'Larsen & Toubro',
      industry: 'Engineering',
      contact: 'campus.recruitment@larsentoubro.com'
    },
    {
      id: '14',
      name: 'Schneider Electric',
      industry: 'Electrical Equipment',
      contact: 'campus.careers@schneider-electric.com'
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
    
    // Package filter
    if (filters.packageAbove) {
      reportData = reportData.filter(item => 
        item.package >= parseFloat(filters.packageAbove)
      );
    }
    
    if (filters.packageBelow) {
      reportData = reportData.filter(item => 
        item.package <= parseFloat(filters.packageBelow)
      );
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
    
    // Additional statistics for enhanced reports
    // Get highest package
    const highestPackage = offers.length > 0 
      ? Math.max(...offers.map(o => o.package)) 
      : 0;
      
    // Get average packages by branch
    const branchPackages = {};
    const branchPlacements = {};
    
    students.forEach(student => {
      const branch = student.branch;
      
      if (!branchPackages[branch]) {
        branchPackages[branch] = {
          total: 0,
          count: 0
        };
        branchPlacements[branch] = {
          total: 0,
          placed: 0
        };
      }
      
      branchPlacements[branch].total++;
      
      const acceptedOffer = offers.find(
        o => o.studentId === student.id && o.status === 'Accepted'
      );
      
      if (acceptedOffer) {
        branchPackages[branch].total += acceptedOffer.package;
        branchPackages[branch].count++;
        branchPlacements[branch].placed++;
      }
    });
    
    const branchStats = {};
    
    Object.keys(branchPackages).forEach(branch => {
      const avgBranchPackage = branchPackages[branch].count > 0 
        ? (branchPackages[branch].total / branchPackages[branch].count).toFixed(2) 
        : 0;
        
      const branchPlacementRate = branchPlacements[branch].total > 0 
        ? ((branchPlacements[branch].placed / branchPlacements[branch].total) * 100).toFixed(2) 
        : 0;
        
      branchStats[branch] = {
        avgPackage: avgBranchPackage,
        placementRate: branchPlacementRate,
        totalStudents: branchPlacements[branch].total,
        placedStudents: branchPlacements[branch].placed
      };
    });
    
    return {
      totalStudents,
      placedStudents,
      placementRate,
      avgPackage,
      topCompany,
      highestPackage,
      branchStats
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