import api from './api';

export const postService = {
  getPosts: (page = 1, limit = 10) => 
    api.get(`/posts?page=${page}&limit=${limit}`),
  
  getPost: (id) => 
    api.get(`/posts/${id}`),
  
  createPost: (postData) => 
    api.post('/posts', postData),
  
  updatePost: (id, postData) => 
    api.put(`/posts/${id}`, postData),
  
  deletePost: (id) => 
    api.delete(`/posts/${id}`)
};