import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditRoom = () => {
  const { roomId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`)
      .then(res => setRoom(res.data))
      .catch(err => console.error("Error loading room"));
  }, [roomId]);

  const handleChange = e => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, room, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room updated successfully!");
      navigate("/admin");
    } catch (err) {
      setMessage("Error updating room");
    }
  };

  if (!room) return <p>Loading...</p>;

  return (
    <section style={{ padding: "20px" }}>
      <h2>Edit Room</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={room.name}
          onChange={handleChange}
          required
        />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={room.type}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={room.description}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={room.price}
          onChange={handleChange}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={room.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Room</button>
      </form>
    </section>
  );
};

export default EditRoom;
