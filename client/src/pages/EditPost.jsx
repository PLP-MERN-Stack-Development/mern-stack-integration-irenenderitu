import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/postService';
import { categoryService } from '../services/categoryService';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load categories and post data
    Promise.all([
      categoryService.getCategories(),
      postService.getPost(id)
    ])
    .then(([categoriesRes, postRes]) => {
      setCategories(categoriesRes.data);
      
      const post = postRes.data;
      // Check if user is the author
      if (post.author?._id !== user._id) {
        setError('You are not authorized to edit this post');
        return;
      }
      
      // Pre-fill form with existing post data
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category?._id || '');
      setTags(post.tags?.join(', ') || '');
    })
    .catch(err => {
      console.error('Failed to load data:', err);
      setError('Failed to load post data');
    });
  }, [user, navigate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const postData = {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      console.log('Updating post data:', postData);
      
      const response = await postService.updatePost(id, postData);
      console.log('Post updated successfully:', response.data);
      
      alert('Post updated successfully!');
      navigate('/posts');
    } catch (err) {
      console.error('Error updating post:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (error && error.includes('not authorized')) {
    return (
      <div className="error" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>{error}</p>
        <button onClick={() => navigate('/posts')} className="btn">
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="post-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, javascript, web-development"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Updating...' : 'Update Post'}
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate('/posts')} 
          className="btn btn-secondary"
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;