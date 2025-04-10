import React, { useState } from "react";
import axios from "axios";
import "./styles/BookingForm.css";

const BookingForm = ({ room }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    totalPrice: room.price,
  });
  const [message, setMessage] = useState(null);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    // For a real Stripe integration, the paymentMethodId should be acquired using Stripe Elements.
    const paymentMethodId = "pm_test_visa";
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        userId: "USER_ID_PLACEHOLDER", // Replace with user ID from context after login
        roomId: room._id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice: room.price,
        paymentMethodId,
      });
      setMessage("Booking successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating booking");
    }
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Book Now</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default BookingForm;
