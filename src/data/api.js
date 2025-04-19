import axios from 'axios';

// API base URL - using the deployed backend
const API_URL = 'https://handl-backend.vercel.app/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) by redirecting to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Days API endpoints
export const daysAPI = {
  getDays: (params) => api.get('/days', { params }),
  getDay: (id) => api.get(`/days/${id}`),
  createDay: (dayData) => api.post('/days', dayData),
  updateDay: (id, dayData) => api.put(`/days/${id}`, dayData),
  deleteDay: (id) => api.delete(`/days/${id}`),
  getStreak: () => api.get('/days/streak'),
  getWeeklyAverage: () => api.get('/days/average'),
};

// User API endpoints
export const userAPI = {
  getProfile: (username) => api.get(`/users/${username}`),
  searchUsers: (query) => api.get('/users/search', { params: { query } }),
  getFriends: () => api.get('/users/friends'),
  getFriendRequests: () => api.get('/users/friend-requests'),
  sendFriendRequest: (username) => api.post(`/users/${username}/friend-request`),
  respondToFriendRequest: (userId, action) => 
    api.put(`/users/friend-request/${userId}`, { action }),
  removeFriend: (friendId) => api.delete(`/users/friends/${friendId}`),
};

// Upload API endpoints
export const uploadAPI = {
  uploadImage: (formData, type = 'general') => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post(`/uploads/image?type=${type}`, formData, config);
  },
};

export default api; 