// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Patal Resort</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        {user ? (
          <>
            <li>Hello, {user.name}</li>
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
            <li>
              <Link to="/cancel-booking">Cancel Booking</Link>
            </li>
            {user.role === "admin" && (
              <>
                <li>
                  <Link to="/admin">Admin Panel</Link>
                </li>
                <li>
                  <Link to="/admin/add-room">Add Room</Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
