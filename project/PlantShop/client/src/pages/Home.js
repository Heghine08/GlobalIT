import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

 function Home() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/shop');
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bring Greenery To Your Home</h1>
          <p>
            Find the perfect plants to freshen up your space. We offer a wide variety 
            of indoor plants, easy to care for and delivered straight to your door.
          </p>
          <button className="btn-explore" onClick={handleExplore}>
            Explore Shop
          </button>
        </div>
        <div className="hero-image-box">
          <img 
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800" 
            alt="Beautiful indoor plants" 
          />
        </div>
      </section>

      <section className="advantages-section">
        <div className="advantage-card">
          <div className="adv-icon">🌿</div>
          <h3>Healthy Plants</h3>
          <p>Guaranteed fresh and vibrant plants straight from our greenhouse.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">📦</div>
          <h3>Safe Delivery</h3>
          <p>Specially packed to ensure your plants arrive safely and stress-free.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">💧</div>
          <h3>Plant Care Support</h3>
          <p>Get free expert advice and guides on how to water and feed your plants.</p>
        </div>
      </section>
    </div>
  );
}
export default Home;