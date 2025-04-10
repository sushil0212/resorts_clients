import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import RoomCard from "../components/RoomCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms`)
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <HeroSection />
      <section style={{ padding: "20px" }}>
        <h2>Our Rooms</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {rooms.length > 0 ? (
            rooms.slice(0, 3).map(room => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
        <Link
          to="/rooms"
          className="btn">
          See All Rooms
        </Link>
      </section>
    </>
  );
};

export default Home;
