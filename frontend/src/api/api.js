import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5204/api', // Default port for backend
});

export const getEmployees = () => api.get('/employees');
export const getEmployee = (id) => api.get(`/employees/${id}`);
export const createEmployee = (employee) => api.post('/employees', employee);
export const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
export const getStats = () => api.get('/employees/stats');

export default api;
