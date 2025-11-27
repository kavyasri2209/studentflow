import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from LocalStorage on app start
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("studentflow_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("studentflow_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = ({ username, role }) => {
    const data = { username, role };
    localStorage.setItem("studentflow_user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("studentflow_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);