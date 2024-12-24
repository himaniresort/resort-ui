// components/RoomCategories.tsx
import React from "react";
import RoomCard, { Room } from "./RoomCard";

import styles from "./RoomCategories.module.scss";

const RoomCategories: React.FC = () => {
  const rooms: Room[] = [
    {
      title: "Double Room",
      price: "199$",
      size: "25 ft",
      capacity: "Max person 2",
      bed: "Queen Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b1.jpg", // Use public folder for Next.js
    },
    {
      title: "Premium King Room",
      price: "159$",
      size: "30 ft",
      capacity: "Max person 5",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b2.jpg",
    },
    {
      title: "Deluxe Room",
      price: "198$",
      size: "35 ft",
      capacity: "Max person 4",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b3.jpg",
    },
    {
      title: "Family Room",
      price: "299$",
      size: "40 ft",
      capacity: "Max person 6",
      bed: "Double Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b4.jpg",
    },
  ];

  return (
    <div className={styles.roomCategories}>
      {rooms.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomCategories;
