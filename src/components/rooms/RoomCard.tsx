// components/RoomCard.tsx
import React from "react";
import styles from "./RoomCard.module.scss";

export interface Room {
  title: string;
  price: string;
  size: string;
  capacity: string;
  bed: string;
  services: string;
  image: string;
}

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.roomCard}>
      <img src={room.image} alt={room.title} className={styles.roomImage} />
      <div className={styles.roomInfo}>
        <h3>{room.title}</h3>
        <p className={styles.price}>{room.price} / Per night</p>
        <div className={styles.moreDetails}>
          <p>Size: {room.size}</p>
          <p>Capacity: {room.capacity}</p>
          <p>Bed: {room.bed}</p>
          <p>Services: {room.services}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
