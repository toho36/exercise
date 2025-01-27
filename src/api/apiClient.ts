import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { useStore } from '@/store/store';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Set the default authorization headers for the apiClient.
 * @param {string} token - The authentication token.
 * @param {string} xApiKey - The API key.
 */
export function setAuthHeaders(token: string, xApiKey: string) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  apiClient.defaults.headers.common['X-API-KEY'] = xApiKey;
}

/**
 * Clear the default authorization headers from the apiClient.
 */
export function clearAuthHeaders() {
  delete apiClient.defaults.headers.common['Authorization'];
  delete apiClient.defaults.headers.common['X-API-KEY'];
}

// Add a request interceptor to automatically attach headers
apiClient.interceptors.request.use(
  config => {
    // You can add additional logic here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle errors globally (e.g., logging, showing notifications)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
