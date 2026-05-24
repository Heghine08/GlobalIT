import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log("Successfully logged in!");
      navigate("/home");
    } else {
      alert("Please enter email and password!");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3 style={{ textAlign: "center", color: "#2e5339", marginTop: 0 }}>
          Login
        </h3>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-buy">
          Sign In
        </button>
      </form>
    </div>
  );
}