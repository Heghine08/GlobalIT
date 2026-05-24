import '../index.css';

function Cart({ plants, onRemove }) {
  const boughtPlants = plants.filter(plant => plant.isBought);

  const totalPrice = boughtPlants.reduce((sum, plant) => sum + plant.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {boughtPlants.length === 0 ? (
        <p className="empty-message">Your cart is empty. Go to the Shop to add some plants! 🌿</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {boughtPlants.map(plant => (
              <div key={plant.id} className="cart-item-card">
                <img src={plant.img} alt={plant.name} />
                <div className="cart-item-details">
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.price}.00</p>
                </div>
                <button className="btn-remove" onClick={() => onRemove(plant.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{boughtPlants.length}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price:</span>
              <span>${totalPrice}.00</span>
            </div>
            <button className="btn-checkout" onClick={() => alert('Order Placed Successfully!')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;