import React from "react";
import { Link } from "react-router-dom";
import "./styles/RoomCard.css";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img
        src={room.image}
        alt={room.name}
      />
      <div className="room-card-info">
        <h3>{room.name}</h3>
        <p>${room.price} per night</p>
        <Link
          to={`/rooms/${room._id}`}
          className="room-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
