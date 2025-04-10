import React, { useEffect, useState } from 'react';
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
