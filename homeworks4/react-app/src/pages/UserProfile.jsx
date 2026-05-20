import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserProfile.css"; 

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) {
    return <div className="loading-state">Բեռնվում է...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <div className="profile-actions">
          <button onClick={() => navigate("/users")} className="back-btn">
            ← Back to Users
          </button>
          <span className="profile-tag">ID #{user.id}</span>
        </div>

        <div className="profile-main-info">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/7153/7153150.png" 
            alt="user avatar" 
            className="profile-avatar"
          />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-username">@{user.username}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="icon">📧</span>
            <div>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="icon">📞</span>
            <div>
              <label>Phone</label>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="icon">🌐</span>
            <div>
              <label>Website</label>
              <p>{user.website}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="icon">🏢</span>
            <div>
              <label>Company</label>
              <p>{user.company.name}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;