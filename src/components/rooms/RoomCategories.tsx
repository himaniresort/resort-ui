import React, { useRef } from "react";
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
      image: "/rooms/room-b1.jpg",
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
    {
      title: "Luxury Suite",
      price: "399$",
      size: "50 ft",
      capacity: "Max person 8",
      bed: "King Beds",
      services: "Wifi, Television, Private Pool...",
      image: "/rooms/room-b5.jpg",
    },
  ];

  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.roomCategoriesContainer}>
      <button className={styles.scrollButton} onClick={scrollLeft}>
        {"<"}
      </button>
      <div className={styles.roomCategoriesWrapper}>
        <div className={styles.roomCategories} ref={scrollContainer}>
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
};

export default RoomCategories;
