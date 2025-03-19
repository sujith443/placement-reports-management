// File: src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Sample users (in a real app, this would come from a backend)
const sampleUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    username: 'faculty',
    password: 'faculty123',
    role: 'faculty',
    name: 'Faculty User'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('currentUser', currentUser ? JSON.stringify(currentUser) : '');
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
  }, [currentUser, isAuthenticated]);

  // Login function
  const login = (username, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const user = sampleUsers.find(
        user => user.username === username && user.password === password
      );

      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      } else {
        setError('Invalid username or password');
        setLoading(false);
        return false;
      }
    }, 500); // Simulate network delay
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!currentUser) return false;
    return currentUser.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
