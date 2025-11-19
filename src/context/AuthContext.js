import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from LocalStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("studentflow_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (username, role) => {
    const data = { username, role };

    localStorage.setItem("studentflow_user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("studentflow_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
