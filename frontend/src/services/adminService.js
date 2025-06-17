import api from '../config/api';

export const adminService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await api.post('/api/admin/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Admin logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get admin dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/api/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get admin profile
  getProfile: async () => {
    try {
      const response = await api.get('/api/admin/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update admin profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/admin/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 