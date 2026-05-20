import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css"; 

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="users-container">
      <h2 className="users-title">All Users</h2>

      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            
            <div className="user-card-header">
              <span className="user-id">User #{user.id}</span>
            </div>

            {/* Օգտատիրոջ նկարը և անունը */}
            <div className="user-info">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/7153/7153150.png" 
                alt="user avatar" 
                className="user-avatar"
              />
              <h3 className="user-name">{user.name}</h3>
            </div>
            
            <Link to={`/users/${user.id}`} className="view-profile-btn">
              View Profile →
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;