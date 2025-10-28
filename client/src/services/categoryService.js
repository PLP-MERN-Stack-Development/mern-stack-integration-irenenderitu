import api from './api';

export const categoryService = {
  getCategories: () => 
    api.get('/categories'),
  
  createCategory: (categoryData) => 
    api.post('/categories', categoryData)
};