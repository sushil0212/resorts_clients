import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <section>
      <h2>Admin Panel</h2>
      <h3>Registered Users</h3>
      {users.length ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
};

export default AdminPanel;
