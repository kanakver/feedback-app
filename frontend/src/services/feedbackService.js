import api from '../config/api';

export const feedbackService = {
  // Get all feedback
  getAllFeedback: async () => {
    try {
      const response = await api.get('/api/feedback');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit new feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await api.post('/api/feedback', feedbackData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get feedback by ID
  getFeedbackById: async (id) => {
    try {
      const response = await api.get(`/api/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update feedback
  updateFeedback: async (id, feedbackData) => {
    try {
      const response = await api.put(`/api/feedback/${id}`, feedbackData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete feedback
  deleteFeedback: async (id) => {
    try {
      const response = await api.delete(`/api/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 