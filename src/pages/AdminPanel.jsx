// src/pages/AdminPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error loading bookings");
    }
  };

  const handleDeleteRoom = async roomId => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch (err) {
      console.error("Error deleting room");
    }
  };

  const handleEditRoom = roomId => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  const handleAddRoom = () => {
    navigate("/admin/add-room");
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* USERS */}
      <h3>Registered Users</h3>
      {users.length > 0 ? (
        <table
          border="1"
          cellPadding="6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {/* ROOMS */}
      <h3>All Rooms</h3>
      <button
        onClick={handleAddRoom}
        style={{ marginBottom: "10px" }}>
        + Add New Room
      </button>
      {rooms.length > 0 ? (
        <table
          border="1"
          cellPadding="6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.description}</td>
                <td>${room.price}</td>
                <td>
                  <button onClick={() => handleEditRoom(room._id)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteRoom(room._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rooms available.</p>
      )}

      {/* BOOKINGS */}
      <h3>All Bookings</h3>
      {bookings.length > 0 ? (
        <table
          border="1"
          cellPadding="6">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Paid</th>
              <th>Cancelled</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.user?.email || "Unknown"}</td>
                <td>{b.room?.name || "Deleted Room"}</td>
                <td>
                  {b.checkIn ? new Date(b.checkIn).toLocaleDateString() : "-"}
                </td>
                <td>
                  {b.checkOut ? new Date(b.checkOut).toLocaleDateString() : "-"}
                </td>
                <td>{b.isPaid ? "Yes" : "No"}</td>
                <td>{b.isCancelled ? "Yes" : "No"}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </section>
  );
};

export default AdminPanel;
