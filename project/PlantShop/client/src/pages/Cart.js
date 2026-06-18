import "../index.css";

function Cart({ cart, cartCount, balance, checkoutMessage, onCheckout, removeFromCart, updateCartQuantity }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <p className="cart-count-display">
        Cart count: {cartCount}
      </p>
      <p className="balance-display">
        Balance: ${balance.toFixed(2)}
      </p>
      {checkoutMessage && (
        <p className="checkout-message">
          {checkoutMessage}
        </p>
      )}

      {cart.length === 0 ? (
        <p className="empty-message">
          Your cart is empty 🌿
        </p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div
                key={item._id}
                className="cart-item-card"
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="price">
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="item-quantity">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      className="btn-qty"
                      onClick={() =>
                        updateCartQuantity(item._id, -1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn-qty"
                      onClick={() =>
                        updateCartQuantity(item._id, 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Total Items:</span>
              <span>{cartCount}</span>
            </div>

            <div className="summary-row total">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;