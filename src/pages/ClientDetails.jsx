// pages/ClientDetails.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  // Redirect if no booking data exists
  if (!bookingData) {
    navigate("/");
    return null;
  }

  const [clientDetails, setClientDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    mobile: "",
  });

  const handleChange = e =>
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const allData = { ...bookingData, ...clientDetails };
    navigate("/payment", { state: allData });
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}>
      <h2>Client Details</h2>
      <label>
        First Name:
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Age:
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Country:
        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Mobile Number:
        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Next: Payment</button>
    </form>
  );
};

export default ClientDetails;
