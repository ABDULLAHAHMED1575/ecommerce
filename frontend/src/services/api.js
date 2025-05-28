import axios from 'axios';

const BASE_URL = 'http://localhost:8000';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'Something went wrong';
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (data && data.detail) {
        errorMessage = data.detail;
      } else if (status === 404) {
        errorMessage = 'Not found';
      } else if (status === 500) {
        errorMessage = 'Server error';
      }
    } else if (error.request) {
      errorMessage = 'Network error - check your connection';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
export { BASE_URL };