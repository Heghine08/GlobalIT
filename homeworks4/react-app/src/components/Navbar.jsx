import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    background: isActive ? "#ee6e26" : "transparent",
    color: isActive ? "#e2e8f0 " : "black",
  });
  return (
    <nav className="navbar">
      <div className="d1">
      <img src="https://karnutshaurma.am/_next/image?url=%2Flogo192.png&w=64&q=75" alt="Logo" />
      <h1 className="logo">Կառնուտ շաուրմա</h1>
      </div>

      <div className="nav-links">
        <NavLink to="/" end style={linkStyle} className="nav-link">
          Բարի գալուստ
        </NavLink>

        <NavLink to="/menu" style={linkStyle} className="nav-link">
          Մենյու
        </NavLink>

        <NavLink to="/services" style={linkStyle} className="nav-link">
          Ծառայություններ
        </NavLink>
        <NavLink to="/shop" style={linkStyle} className="nav-link">
          Shop
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;