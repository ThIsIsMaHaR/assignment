import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

// Automatically add JWT token to headers
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getTasks = () => API.get('/tasks'); // Changed from fetchTasks to getTasks
export const createTask = (data) => API.post('/tasks', data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);