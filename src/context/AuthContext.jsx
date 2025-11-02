import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    const user = userData || {
      name: 'Admin User',
      email: 'admin@coalministry.gov.in',
      role: 'Environmental Officer'
    };
    setUser(user);
    
    // Store in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    // Stay on home dashboard after logout
    navigate('/');
  };

  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const goToLogin = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    requireAuth,
    showLoginPrompt,
    closeLoginPrompt,
    goToLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
