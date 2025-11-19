import React from "react";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // Optional icon

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">🎓 StudentFlow</div>

      <div className="header-right">
        {user && (
          <>
            <span className="username">
              <FaUserCircle size={22} /> {user.username} ({user.role})
            </span>

            <button className="btn logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
