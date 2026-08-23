import axios from 'axios';

const API_URL = 'http://localhost:3006/api';

// Set auth token in headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    axios.post(`${API_URL}/users/register`, userData),
  
  login: (credentials: { email: string; password: string }) =>
    axios.post(`${API_URL}/users/login`, credentials),
  
  getProfile: () =>
    axios.get(`${API_URL}/users/profile`),
  
  updateProfile: (userData: { name?: string; email?: string; password?: string }) =>
    axios.put(`${API_URL}/users/profile`, userData)
};

// History API
export const historyAPI = {
  getHistory: () =>
    axios.get(`${API_URL}/history`),
  
  addToHistory: (data: { image: string; breedName: string; breedData: any }) =>
    axios.post(`${API_URL}/history`, data),
  
  deleteHistoryItem: (id: string) =>
    axios.delete(`${API_URL}/history/${id}`),
  
  clearHistory: () =>
    axios.delete(`${API_URL}/history`)
};

// Product API
export const productAPI = {
  getProducts: (params?: any) =>
    axios.get(`${API_URL}/products`, { params }),
  
  getProductById: (id: string) =>
    axios.get(`${API_URL}/products/${id}`),
  
  getCategories: () =>
    axios.get(`${API_URL}/products/categories`)
};

// Order API
export const orderAPI = {
  createOrder: (orderData: any) =>
    axios.post(`${API_URL}/orders`, orderData),
  
  getOrders: (params?: any) =>
    axios.get(`${API_URL}/orders`, { params }),
  
  getOrderById: (id: string) =>
    axios.get(`${API_URL}/orders/${id}`),
  
  cancelOrder: (id: string) =>
    axios.delete(`${API_URL}/orders/${id}`)
};

export default {
  setAuthToken,
  authAPI,
  historyAPI,
  productAPI,
  orderAPI
};
