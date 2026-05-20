import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PostDetail.css"; 

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <div className="loading-state">Բեռնվում է...</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-card">
        
        <div className="post-detail-actions">
          <button onClick={() => navigate("/posts")} className="back-btn">
            ← Back to Posts
          </button>
          <span className="post-detail-tag">Post #{post.id}</span>
        </div>

        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-body">{post.body}</p>        
      </div>
    </div>
  );
}

export default PostDetail;