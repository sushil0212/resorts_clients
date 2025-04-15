// pages/CancelBooking.jsx
import React, { useState } from "react";
import axios from "axios";

const CancelBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    if (!bookingId) {
      setMessage("Please enter a valid Booking ID.");
      return;
    }
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel and receive a refund?"
    );
    if (!confirmCancel) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to cancel booking.");
    }
  };

  return (
    <div className="form">
      <h2>Cancel Booking & Refund</h2>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
      />
      <button onClick={handleCancel}>Cancel Booking</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CancelBooking;
