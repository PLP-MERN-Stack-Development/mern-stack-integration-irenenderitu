import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <div className="post-meta">
          <span>By {post.author?.username}</span>
          <span>In {post.category?.name}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      {post.excerpt && (
        <p className="post-excerpt">{post.excerpt}</p>
      )}
      <div className="post-footer">
        <Link to={`/posts/${post._id}`} className="btn-read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;