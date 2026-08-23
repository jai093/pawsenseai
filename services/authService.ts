import axios from 'axios';

const API_URL = 'http://localhost:3006/api/users';

// Register user
const register = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Login user
const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from localStorage
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get auth header for protected routes
const getAuthHeader = () => {
  const user = getCurrentUser();
  
  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}` };
  } else {
    return {};
  }
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthHeader
};
