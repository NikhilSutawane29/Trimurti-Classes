import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { authApi, adminApi } from '../utils/api';

// Create Authentication Context
const AuthContext = createContext(null);

// AuthProvider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return false;
      }

      // Check if token is expired
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token expired
        handleLogout();
        setLoading(false);
        return false;
      }

      // Token valid, get current user data
      const { data } = await authApi.getCurrentUser();
      setUser(data);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      handleLogout();
      setLoading(false);
      return false;
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.register(userData);

      // Save token and user data
      localStorage.setItem('token', response.token);
      setUser(response.data);

      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message || 'Registration failed');
      setLoading(false);
      throw error;
    }
  };

  // Login user
  const login = async (credentials, isAdminLogin = false) => {
    try {
      setLoading(true);
      setError(null);

      // Use admin login endpoint if it's an admin login
      const response = isAdminLogin 
        ? await adminApi.login(credentials)
        : await authApi.login(credentials);

      // Save token and user data
      localStorage.setItem('token', response.token);
      setUser(response.user || response.data);

      setLoading(false);
      return response.user || response.data;
    } catch (error) {
      setError(error.message || 'Login failed');
      setLoading(false);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);

      // Call logout API
      await authApi.logout();

      // Clean up regardless of API success
      handleLogout();

      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clean up even if API fails
      handleLogout();
      setLoading(false);
      navigate('/login');
    }
  };

  // Handle logout state cleanup
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);

      const response = await authApi.updateProfile(userData);
      setUser(response.data);

      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message || 'Profile update failed');
      setLoading(false);
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);

      const response = await authApi.changePassword(passwordData);
      // Update token if returned
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message || 'Password change failed');
      setLoading(false);
      throw error;
    }
  };

  // Request password reset
  const forgotPassword = async (email) => {
    try {
      setLoading(true);

      const response = await authApi.forgotPassword({ email });

      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message || 'Password reset request failed');
      setLoading(false);
      throw error;
    }
  };

  // Reset password with token
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);

      const response = await authApi.resetPassword(token, { password });

      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Password reset failed');
      setLoading(false);
      throw error;
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  // Check if user is student
  const isStudent = () => {
    return user && user.role === 'student';
  };

  // Clear auth errors
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin,
    isStudent,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    checkAuth,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
