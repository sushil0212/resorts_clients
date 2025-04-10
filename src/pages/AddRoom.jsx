import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = e =>
    setRoomData({ ...roomData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Adjust the endpoint if your backend supports a POST /rooms route
      await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, roomData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Room added successfully!");
      navigate("/rooms");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding room");
    }
  };

  return (
    <section>
      <h2>Add Room</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={roomData.name}
          onChange={handleChange}
          required
        />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={roomData.type}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={roomData.description}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={roomData.price}
          onChange={handleChange}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={roomData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Room</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default AddRoom;
