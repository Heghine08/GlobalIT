import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="posts-container">
      <h2 className="posts-title">All Posts</h2>

      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="card-header">
              <span className="post-id">Post #{post.id}</span>
            </div>
            <h3 className="post-card-title">{post.title}</h3> 
            
            <Link to={`/posts/${post.id}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Posts;