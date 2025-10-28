import api from './api';

export const authService = {
  register: (userData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  getMe: () => 
    api.get('/auth/me').then(res => res.data)
};