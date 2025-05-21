import React, { useRef } from "react";
import RoomCard, { Room } from "./RoomCard";

import styles from "./RoomCategories.module.scss";

const RoomCategories = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const rooms: Room[] = [
    {
      title: "Delux Room",
      price: "₹3000 / person",
      size: "25 ft",
      capacity: "Max person 6",
      bed: "3 Queen Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b1.jpg",
    },
    {
      title: "Standard Room",
      price: "₹2500 / person",
      size: "30 ft",
      capacity: "Max person 4",
      bed: "2 Queen Beds",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b2.jpg",
    },
    {
      title: "Tent Stay",
      price: "₹1500 / person",
      size: "35 ft",
      capacity: "Max person 2",
      bed: "tent",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b3.jpg",
    },
    {
      title: "Single Room",
      price: "₹2000 / person",
      size: "40 ft",
      capacity: "Max person 2",
      bed: "Double Bed",
      services: "Wifi, Television, Bathroom...",
      image: "/rooms/room-b4.jpg",
    }
  ];

  const scrollContainer = useRef<HTMLDivElement>(null);
  const cardWidth = 320; // Single card width including margin
  const visibleCards = 4; // Number of cards visible at once

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -cardWidth * visibleCards,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: cardWidth * visibleCards,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={ref} className={styles.roomCategoriesContainer}>
      <button className={styles.scrollButton} onClick={scrollLeft}>
        {"<"}
      </button>
      <div className={styles.roomCategoriesWrapper}>
        <div className={styles.roomCategories} ref={scrollContainer}>
          {rooms.map((room, index) => (
            <div className={styles.roomCard} key={index}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.scrollButton} onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
})


RoomCategories.displayName = "RoomCategories";

export default RoomCategories;
