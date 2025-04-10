import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const Book = () => {
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
      <h2>Booking for {room.name}</h2>
      <BookingForm room={room} />
    </section>
  );
};

export default Book;
