import React, { useState } from "react";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';


function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    // FIX: Pass object instead of two parameters
    login({ username, role });

    // Use navigate instead of window.location
    navigate("/dashboard");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="home-btn btn btn-light shadow-sm"
            onClick={() => navigate('/')}
            aria-label="Go to home"
          >
            <FaHome size={18} />
          </button>
        </div>

        <h2>🎓 StudentFlow Login</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          className="input"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
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

        <p className="demo-hint">
          💡 Demo accounts available for all roles
        </p>
      </div>
    </div>
  );
}

export default LoginPage;