// src/pages/MyBookings.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/bookings/user/${user.id}`)
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load bookings.");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} style={{ border: "1px solid #ddd", marginBottom: "1rem", padding: "1rem" }}>
              <p>
                <strong>Room:</strong>{" "}
                {booking.roomId && booking.roomId.name ? booking.roomId.name : "N/A"}
              </p>
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()} -{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Booking ID:</strong> {booking._id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
