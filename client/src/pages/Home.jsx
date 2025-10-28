import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { postService } from '../services/postService';
import PostCard from '../components/PostCard';

const Home = () => {
  const { data, loading, error } = useApi(() => 
    postService.getPosts(1, 3).then(response => response.data)
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to MERN Blog</h1>
        <p>A full-stack blog application built with MongoDB, Express, React, and Node.js</p>
        <div className="hero-actions">
          <Link to="/posts" className="btn btn-primary">Browse Posts</Link>
          <Link to="/create-post" className="btn btn-secondary">Write a Post</Link>
        </div>
      </section>

      <section className="recent-posts">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {data?.posts?.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        
        {data?.posts?.length === 0 && (
          <div className="no-posts">
            <p>No posts yet. Be the first to write one!</p>
            <Link to="/create-post" className="btn btn-primary">Create First Post</Link>
          </div>
        )}
        
        {data?.posts?.length > 0 && (
          <div className="view-all">
            <Link to="/posts" className="btn">View All Posts</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;