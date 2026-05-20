import { useNavigate } from 'react-router-dom';
import './NotFound.css'; 

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        {/* Մեծ 404 տեքստը */}
        <h1 className="not-found-code">404</h1>
        
        <h2 className="not-found-title">Page not found</h2>


        <button className="not-found-btn" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;