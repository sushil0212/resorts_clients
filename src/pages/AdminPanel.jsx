/* // src/pages/AdminPanel.jsx
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch {
      console.error("Error loading users");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      setRooms(res.data);
    } catch {
      console.error("Error loading rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      console.error("Error loading bookings");
    }
  };

  const handleDeleteRoom = async roomId => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch {
      console.error("Error deleting room");
    }
  };

  const handleEditRoom = roomId => navigate(`/admin/edit-room/${roomId}`);
  const handleAddRoom = () => navigate("/admin/add-room");

  // New: Delete booking history
  const handleDeleteBooking = async bookingId => {
    if (!window.confirm("Delete this booking history?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking history deleted.");
      fetchBookings();
    } catch {
      console.error("Error deleting booking");
      setMessage("Failed to delete booking history.");
    }
  };

  // New: Delete a user
  const handleDeleteUser = async userId => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch {
      console.error("Error deleting user");
      setMessage("Failed to delete user.");
    }
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}


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
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>

                  {u._id !== "" && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      style={{ color: "red" }}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}


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
            {rooms.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>${r.price}</td>
                <td>
                  <button onClick={() => handleEditRoom(r._id)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteRoom(r._id)}>
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
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.userId?.email || "Unknown"}</td>
                <td>{b.roomId?.name || "Deleted Room"}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.paymentId ? "Yes" : "No"}</td>
                <td>{b.status === "Cancelled" ? "Yes" : "No"}</td>
                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
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
 */

/* // src/pages/AdminPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers]       = useState([]);
  const [rooms, setRooms]       = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage]   = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch {
      console.error("Error loading users");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      setRooms(res.data);
    } catch {
      console.error("Error loading rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);
    } catch {
      console.error("Error loading bookings");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch {
      console.error("Error deleting room");
    }
  };

  const handleEditRoom = (roomId) => navigate(`/admin/edit-room/${roomId}`);
  const handleAddRoom  = () => navigate("/admin/add-room");

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Delete this booking history?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking history deleted.");
      fetchBookings();
    } catch {
      console.error("Error deleting booking");
      setMessage("Failed to delete booking history.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch {
      console.error("Error deleting user");
      setMessage("Failed to delete user.");
    }
  };

  const handleAdminCancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel and refund this booking?")) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking cancelled and refunded.");
      fetchBookings();
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setMessage("Failed to cancel booking.");
    }
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}


      <h3>Registered Users</h3>
      {users.length > 0 ? (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}


      <h3>All Rooms</h3>
      <button onClick={handleAddRoom} style={{ marginBottom: "10px" }}>
        + Add New Room
      </button>
      {rooms.length > 0 ? (
        <table border="1" cellPadding="6">
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
            {rooms.map((r) => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>${r.price}</td>
                <td>
                  <button onClick={() => handleEditRoom(r._id)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteRoom(r._id)}>
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


      <h3>All Bookings</h3>
      {bookings.length > 0 ? (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Paid</th>
              <th>Cancelled</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                
                <td>{b.userId?.email || "Deleted User"}</td>
                <td>{b.roomId?.name || "Deleted Room"}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.paymentId ? "Yes" : "No"}</td>
                <td>{b.status === "Cancelled" ? "Yes" : "No"}</td>
                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleAdminCancelBooking(b._id)}
                      style={{ marginRight: "8px" }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
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

 */

/* // src/pages/AdminPanel.jsx
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

  // Fetch helpers
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch {
      console.error("Error loading users");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      setRooms(res.data);
    } catch {
      console.error("Error loading rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      console.error("Error loading bookings");
    }
  };

  // Handlers: Users, Rooms, Bookings actions
  const handleDeleteUser = async userId => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch {
      console.error("Error deleting user");
      setMessage("Failed to delete user.");
    }
  };

  const handleDeleteRoom = async roomId => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch {
      console.error("Error deleting room");
    }
  };

  const handleEditRoom = roomId => navigate(`/admin/edit-room/${roomId}`);
  const handleAddRoom = () => navigate("/admin/add-room");

  const handleDeleteBooking = async bookingId => {
    if (!window.confirm("Delete this booking history?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking history deleted.");
      fetchBookings();
    } catch {
      console.error("Error deleting booking");
      setMessage("Failed to delete booking history.");
    }
  };

  const handleAdminCancelBooking = async bookingId => {
    if (!window.confirm("Cancel and refund this booking?")) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking cancelled and refunded.");
      fetchBookings();
    } catch {
      console.error("Error cancelling booking");
      setMessage("Failed to cancel booking.");
    }
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      // Registered Users
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      // All Rooms
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
            {rooms.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>${r.price}</td>
                <td>
                  <button onClick={() => handleEditRoom(r._id)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteRoom(r._id)}>
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
      // All Bookings 
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
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.userId?.email || b.userEmail}</td>
                <td>{b.roomId?.name}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.paymentId ? "Yes" : "No"}</td>
                <td>{b.status === "Cancelled" ? "Yes" : "No"}</td>
                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleAdminCancelBooking(b._id)}
                      style={{ marginRight: "8px" }}>
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
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
 */

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token, user } = useContext(AuthContext); // Ensure 'user' is also provided in context
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.email !== "sushilstar9@gmail.com") {
      // Redirect to the home page or any page you prefer if user is not an admin
      navigate("/");
    } else {
      fetchUsers();
      fetchRooms();
      fetchBookings();
    }
  }, [user, navigate]);

  // Fetch helpers
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch {
      console.error("Error loading users");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
      setRooms(res.data);
    } catch {
      console.error("Error loading rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      console.error("Error loading bookings");
    }
  };

  // Handlers: Users, Rooms, Bookings actions
  const handleDeleteUser = async userId => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch {
      console.error("Error deleting user");
      setMessage("Failed to delete user.");
    }
  };

  const handleDeleteRoom = async roomId => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room deleted successfully.");
      fetchRooms();
    } catch {
      console.error("Error deleting room");
    }
  };

  const handleEditRoom = roomId => navigate(`/admin/edit-room/${roomId}`);
  const handleAddRoom = () => navigate("/admin/add-room");

  const handleDeleteBooking = async bookingId => {
    if (!window.confirm("Delete this booking history?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking history deleted.");
      fetchBookings();
    } catch {
      console.error("Error deleting booking");
      setMessage("Failed to delete booking history.");
    }
  };

  const handleAdminCancelBooking = async bookingId => {
    if (!window.confirm("Cancel and refund this booking?")) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking cancelled and refunded.");
      fetchBookings();
    } catch {
      console.error("Error cancelling booking");
      setMessage("Failed to cancel booking.");
    }
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Registered Users */}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {/* All Rooms */}
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
            {rooms.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>${r.price}</td>
                <td>
                  <button onClick={() => handleEditRoom(r._id)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteRoom(r._id)}>
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

      {/* All Bookings */}
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
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.userId?.email || b.userEmail}</td>
                <td>{b.roomId?.name}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>{b.paymentId ? "Yes" : "No"}</td>
                <td>{b.status === "Cancelled" ? "Yes" : "No"}</td>
                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleAdminCancelBooking(b._id)}
                      style={{ marginRight: "8px" }}>
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
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
