import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      setUser(res.data.user);
      setToken(res.data.token);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { name, email, password }
      );
      setUser(res.data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
