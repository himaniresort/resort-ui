import React, { useEffect, useRef } from "react";
import RoomCard from "./RoomCard";

import styles from "./RoomCategories.module.scss";
import { useMediaQuery, useTheme } from "@mui/material";
import useRoomTypeStore from "@/store/RoomType";

const RoomCategories = React.forwardRef<HTMLDivElement, {}>((props, ref) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const { fetchRoomType, roomTypeData } = useRoomTypeStore();
  useEffect(() => {
    fetchRoomType()
  }, []);

  const scrollContainer = useRef<HTMLDivElement>(null);
  const cardWidth = 320; // Single card width including margin
  const visibleCards = isMobile ? 1 : 3; // Number of cards visible at once

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
          {roomTypeData.map((room, index) => (
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
