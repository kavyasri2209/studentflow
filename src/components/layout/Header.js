import React from "react";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  if (!user) return null; // don't show header when logged out

  return (
    <header className="header">
      <div className="logo">🎓 StudentFlow</div>

      <button className="btn logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
