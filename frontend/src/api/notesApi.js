import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 8000
});

// optional: interceptors to centralize error handling
api.interceptors.response.use(
  res => res,
  err => {
    // transform error to a consistent shape
    const message = err.response?.data?.error || err.message || 'Network Error';
    return Promise.reject({ status: err.response?.status, message });
  }
);

export const fetchNotes = () => api.get('/notes').then(res => res.data);
export const createNote = (payload) => api.post('/notes', payload).then(res => res.data);
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload).then(res => res.data);
export const deleteNote = (id) => api.delete(`/notes/${id}`).then(res => res.data);
