import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch (error) {
    return null;
  }
};

function Shop({ addToCart, cart, cartCount, updateCartQuantity }) {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = token ? decodeToken(token) : null;
    setIsAdmin(decoded?.role === "admin");
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div>
          <h2 className="shop-title">Our Plant Collection</h2>
          <p className="shop-subtitle">
            Grow your own urban jungle with our finest selection.
          </p>
        </div>
        {isAdmin && (
          <button
            className="btn-admin-shop"
            onClick={() => navigate("/admin")}
          >
            Go to Admin
          </button>
        )}
      </div>

      <div className="plants-grid">
        {products.map((product) => {
          const cartItem = cart.find(
            (item) => item._id === product._id
          );
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div key={product._id} className="plant-card">
              <div className="plant-image-wrapper">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="plant-info">
                <h3>{product.name}</h3>

                <p className="plant-price">${product.price}.00</p>

                <button
                  className="btn-buy-product"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <div className="quantity-controls">
                  <button
                    className="btn-qty"
                    onClick={() => updateCartQuantity(product._id, -1)}
                    disabled={quantity === 0}
                  >
                    -
                  </button>
                  <span className="quantity-value">
                    {quantity}
                  </span>
                  <button
                    className="btn-qty"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
