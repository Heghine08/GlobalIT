import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    background: isActive ? "#7c3aed" : "transparent",
    color: isActive ? "white" : "#e2e8f0",
  });
  return (
    <nav className="navbar">
      <h1 className="logo">React App</h1>

      <div className="nav-links">
        <NavLink to="/" end style={linkStyle} className="nav-link">
          Home
        </NavLink>

        <NavLink to="/posts" style={linkStyle} className="nav-link">
          Posts
        </NavLink>

        <NavLink to="/users" style={linkStyle} className="nav-link">
          Users
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;