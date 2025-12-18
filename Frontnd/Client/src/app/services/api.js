// src/app/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Setting a base URL can simplify service files
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Get the user data from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const token = user.token;

      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Attaching bearer token to request."); // For debugging
      }
    }
    // Make sure to include withCredentials if your backend requires it (e.g., for cookies, though less common with tokens)
    config.withCredentials = true; 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
