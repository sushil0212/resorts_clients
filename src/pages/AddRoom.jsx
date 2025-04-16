/* import React, { useState, useContext } from "react";
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
 */

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddRoom = () => {
  const { token } = useContext(AuthContext); // Get the token from AuthContext
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = e => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !roomData.name ||
      !roomData.type ||
      !roomData.description ||
      !roomData.price ||
      !roomData.image
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      console.log("Submitting room data:", roomData); // Debug log
      // Send POST request including the Authorization header
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rooms`,
        { ...roomData, price: Number(roomData.price) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      navigate("/rooms");
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Error adding room. Please try again."
      );
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
          placeholder="Room Name"
          value={roomData.name}
          onChange={handleChange}
          required
        />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          placeholder="Room Type"
          value={roomData.type}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={roomData.description}
          onChange={handleChange}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={roomData.price}
          onChange={handleChange}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
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
