import React, { useState } from "react";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("teacher");

  const handleLogin = () => {
    if (!username.trim()) return alert("Please enter a username");

    login(username, role);

    window.location.href = "/"; // redirect
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>StudentFlow Login</h2>

        <input
          className="input"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="administrator">Administrator</option>
          <option value="coordinator">Coordinator</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
