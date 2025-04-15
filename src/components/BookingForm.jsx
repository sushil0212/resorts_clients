/* import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./styles/BookingForm.css";

const BookingForm = ({ room }) => {
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Calculate total price based on start and end date
  const calculateTotalPrice = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24); // Get the number of days
    return days > 0 ? room.price * days : 0; // Total price = price per night * number of nights
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      setMessage("You must be logged in to book a room.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // IMPORTANT: Use user.id instead of user._id since the login response sets the property as "id"
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        userId: user.id, // Changed from user._id to user.id
        roomId: room._id, // Pass the room ID
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice: calculateTotalPrice(), // Pass the dynamically calculated total price
        paymentMethodId: "pm_card_visa", // Test payment method, replace with real payment in production
      });

      setMessage("✅ Booking successful!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
      <label>Total Price: ${calculateTotalPrice()}</label>
      <button
        type="submit"
        disabled={loading}>
        {loading ? "Processing..." : "Book Now"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default BookingForm;
 */

// components/BookingForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./styles/BookingForm.css";

const BookingForm = () => {
  const { user } = useContext(AuthContext);
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");

  // Fetch room details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`)
      .then(res => setRoom(res.data))
      .catch(err => console.error("Failed to load room:", err));
  }, [roomId]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Calculate total price based on dates
  const calculateTotalPrice = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    return days > 0 ? room.price * days : 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!user) {
      setMessage("You must be logged in to book a room.");
      return;
    }
    if (!room) {
      setMessage("Room details not loaded yet.");
      return;
    }
    // Prepare booking data
    const bookingData = {
      userId: user.id, // user.id from login response
      roomId: room._id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: calculateTotalPrice(),
    };
    navigate("/client-details", { state: bookingData });
  };

  if (!room) return <p>Loading room details...</p>;

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}>
      <h2>Booking Information</h2>
      <p>
        <strong>Room:</strong> {room.name} - ${room.price} per night
      </p>
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
      <p>Total Price: ${calculateTotalPrice()}</p>
      {message && <p className="error">{message}</p>}
      <button type="submit">Next: Enter Client Details</button>
    </form>
  );
};

export default BookingForm;
