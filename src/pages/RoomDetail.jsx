import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RoomDetail = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error(err));
  }, [roomId]);

  if (!room) return <p>Loading...</p>;

  return (
    <section>
      <h2>{room.name}</h2>
      <img src={room.image} alt={room.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>{room.description}</p>
      <p>
        <strong>Price:</strong> ${room.price}
      </p>
      <Link to={`/book/${room._id}`} className="btn">
        Book Now
      </Link>
    </section>
  );
};

export default RoomDetail;
