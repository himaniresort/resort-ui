// components/RoomCard.tsx
import React from "react";
import styles from "./RoomCard.module.scss";
import Image from 'next/image';
import { RoomType } from "@/types/RoomType";
import { facilitiesDeluxe, facilitiesTent } from "@/constants/room-types-constants";

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
  room: RoomType;
}



const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.roomCard}>
      <Image src={room.image} alt={room.name} className={styles.roomImage} layout="responsive" width={300} height={382} />
      <div className={styles.roomInfo}>
        <h3>{room.name}</h3>
        <p className={styles.price}>{room.cost} / night / person</p>
        <div className={styles.moreDetails}>
          <p>Capacity: {room.capacity}</p>
          <p>Services: {room.type === 'tent' ? facilitiesTent.join(', ') : facilitiesDeluxe.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
