import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>About Us</h4>
          <p>Patal Resorts provides the best rooms and services.</p>
        </div>
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/rooms">Rooms</a>
            </li>
            <li>
              <a href="/admin">Admin Panel</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: copycat9650@gmail.com</p>
          <p>Phone: +977 9819732343</p>
        </div>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Patal Resort . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
