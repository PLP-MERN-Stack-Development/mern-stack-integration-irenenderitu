import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { postService } from '../services/postService';
import { useAuth } from '../context/AuthContext';

const Post = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: post, loading, error } = useApi(() => 
    postService.getPost(id).then(response => response.data)
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  const isAuthor = user && post.author?._id === user._id;

  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author?.username}</span>
          <span>In {post.category?.name}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {isAuthor && (
          <div className="post-actions">
            <Link to={`/edit-post/${post._id}`} className="btn btn-edit">
              Edit Post
            </Link>
          </div>
        )}
      </header>

      {post.featuredImage && (
        <div className="post-image">
          <img src={post.featuredImage} alt={post.title} />
        </div>
      )}

      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};

export default Post;