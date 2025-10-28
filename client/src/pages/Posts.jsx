import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { postService } from '../services/postService';
import PostCard from '../components/PostCard';

const Posts = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useApi(
    () => postService.getPosts(page, 6).then(response => {
      // Handle the nested data structure
      return response.data; // This extracts the inner data object
    }),
    null,
    [page]
  );

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage(page + 1);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="posts-page">
      <h1>All Posts</h1>
      
      <div className="posts-grid">
        {data?.posts?.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {data?.posts?.length === 0 && (
        <div className="no-posts">
          <p>No posts found. Be the first to write one!</p>
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={handlePrevious} 
            disabled={page === 1}
            className="btn"
          >
            Previous
          </button>
          <span>Page {page} of {data.totalPages}</span>
          <button 
            onClick={handleNext} 
            disabled={page === data.totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;