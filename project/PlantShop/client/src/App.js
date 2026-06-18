import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  const [cart, setCart] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [checkoutMessage, setCheckoutMessage] = useState("");


  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );
  };

  const reportSales = async (items) => {
    try {
      await fetch("http://localhost:5000/api/products/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
    } catch (error) {
      console.error("Unable to report sales:", error);
    }
  };

  const handleCheckout = async () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (totalPrice === 0) {
      setCheckoutMessage("Your cart is empty.");
      return;
    }

    if (totalPrice > balance) {
      setCheckoutMessage(
        "Not enough balance to complete checkout."
      );
      return;
    }

    const newBalance = Number((balance - totalPrice).toFixed(2));

    await reportSales(
      cart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
      }))
    );

    setBalance(newBalance);
    setCart([]);
    setCheckoutMessage(
      `Checkout complete! New balance: $${newBalance}`
    );
  };

  return (
    <Router>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/shop"
          element={
            <Shop
              addToCart={addToCart}
              cart={cart}
              cartCount={cartCount}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              cartCount={cartCount}
              balance={balance}
              checkoutMessage={checkoutMessage}
              onCheckout={handleCheckout}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;