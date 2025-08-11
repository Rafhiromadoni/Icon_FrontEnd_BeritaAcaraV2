// src/services/api.js
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

// Buat instance Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // URL dasar backend Anda
  timeout: 10000,
  withCredentials: true,    
});

export function uploadTemplate(file) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('fileName', file.name);
  return apiClient.post('/api/template/upload', fd);
}

export function generateFromUploaded(templatePath, data) {
  return apiClient.post(
    '/api/template/generate-uploaded',
    { templatePath, data },
    { responseType: 'blob' }
  );
}
// Buat Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;