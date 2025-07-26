// components/RoomCard.tsx
import React from "react";
import styles from "./RoomCard.module.scss";
import Image from "next/image";
import { RoomType } from "@/types/RoomType";
import {
  DELUXE_FACILITIES,
  TENT_FACILITIES,
} from "@/constants/room-types-constants";
// import { facilitiesDeluxe, facilitiesTent } from "@/constants/room-types-constants";

interface RoomCardProps {
  room: RoomType;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.roomCard}>
      <Image
        src={room.image}
        alt={room.name}
        className={styles.roomImage}
        layout="responsive"
        width={300}
        height={382}
      />
      <div className={styles.roomInfo}>
        <h3>{room.name}</h3>
        <p className={styles.price}>{room.cost} / night / person</p>
        <div className={styles.moreDetails}>
          <p>Max Occupancy: {room.max_occupancy}</p>
          <p>
            Services:{" "}
            {room.type === "tent"
              ? TENT_FACILITIES.join(", ")
              : DELUXE_FACILITIES.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
