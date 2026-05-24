import React from 'react';

import '../index.css';

function Shop({ plants, onBuy }) {
  return (
    <div className="shop-container">
      <h2 className="shop-title">Our Plant Collection</h2>
      <p className="shop-subtitle">Grow your own urban jungle with our finest selection.</p>

      <div className="plants-grid">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            
            <div className="plant-image-wrapper">
              <img src={plant.img} alt={plant.name} />
              {plant.isBought && <span className="badge-sold">In Cart</span>}
            </div>

            <div className="plant-info">
              <h3>{plant.name}</h3>
              <p className="plant-price">${plant.price}.00</p>
              
              <button 
                className={`btn-buy-product ${plant.isBought ? 'bought' : ''}`}
                onClick={() => onBuy(plant.id)}
                disabled={plant.isBought} 
              >
                {plant.isBought ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
export default Shop;