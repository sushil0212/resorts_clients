/* import React, { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms`)
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <h2>Our Rooms</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </section>
  );
};

export default Rooms;
 */

// src/pages/Rooms.jsx
import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchRooms();
  }, [searchTerm, sortOrder]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`, {
        params: {
          search: searchTerm,
          sort: sortOrder,
        },
      });
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  return (
    <section style={{ padding: "20px" }}>
      <h2>Our Rooms</h2>

      {/* Filter Controls */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          style={{ padding: "8px", width: "180px" }}>
          <option value="">Sort by price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      {/* Room Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {rooms.length > 0 ? (
          rooms.map(room => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </section>
  );
};

export default Rooms;
