import React from 'react';
import '../index.css';

function About() {
  return (
    <div className="about-container">
      {/* Վերնագրի բաժին */}
      <div className="about-header">
        <h2>Our Story</h2>
        <p className="about-subtitle">Bringing nature closer to your living space since 2020.</p>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800" 
            alt="Our greenhouse and plants" 
          />
        </div>
        <div className="about-text">
          <h3>Why PlantShop?</h3>
          <p>
            PlantShop started as a small backyard greenhouse with a big dream: to make homes greener, 
            healthier, and happier. We believe that plants are not just decorations; they are living 
            companions that improve our well-being and clean the air we breathe.
          </p>
          <p>
            Every single plant in our collection is carefully raised, inspected for pests, and loved 
            by our team of expert botanists before it gets packaged and shipped directly to your doorstep. 
            We make sure you get only the healthiest and most vibrant green friends.
          </p>
        </div>
      </div>

      <div className="values-section">
        <h3 className="values-title">Our Values</h3>
        <div className="values-grid">
          <div className="value-box">
            <h4>🌿 100% Eco-Friendly</h4>
            <p>We use biodegradable packaging and organic fertilizers to protect our beautiful planet.</p>
          </div>
          <div className="value-box">
            <h4>🌱 Quality First</h4>
            <p>If your plant arrives damaged or gets sick within 14 days, we will replace it for free.</p>
          </div>
          <div className="value-box">
            <h4>💚 Plant Education</h4>
            <p>We don't just sell plants. We provide detailed digital care guides for every species.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;