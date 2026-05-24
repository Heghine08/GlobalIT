import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../index.css";

function Navbar({ plants }) {
  const cartCount = plants.filter((plant) => plant.isBought).length;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          Plant<span>Shop</span>
        </Link>     
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <span className="cart-icon-wrapper">
              <i className="fa-solid fa-cart-arrow-down"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
