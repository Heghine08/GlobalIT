import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
          .join(""),
      ),
    );
  } catch (error) {
    return null;
  }
};

function Navbar({ cartCount }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAdminState = () => {
    const token = localStorage.getItem("token");
    const decoded = token ? decodeToken(token) : null;
    setIsAdmin(decoded?.role === "admin");
  };

  useEffect(() => {
    updateAdminState();
    window.addEventListener("authChange", updateAdminState);
    return () => {
      window.removeEventListener("authChange", updateAdminState);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <i className="fa-solid fa-leaf" style={{ color: "#2e5339", marginRight: "8px" }}></i>
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
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Login
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
        {isAdmin && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
