import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem(
        "token",
        data.token
      );
      window.dispatchEvent(new Event("authChange"));

      const payload = data.token.split(".")[1];
      const decoded = JSON.parse(
        decodeURIComponent(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );

      alert("Login successful!");
      if (decoded?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Login failed");
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