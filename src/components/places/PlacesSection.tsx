import React, { useEffect, useState } from "react";
import styles from "./PlacesSection.module.scss";
import Image from 'next/image';
import { useMediaQuery, useTheme } from "@mui/material";
import usePlacesStore from "@/store/PlacesStore";

const PlacesSection: React.FC = () => {

  const { fetchPlaces, placesData } = usePlacesStore();
  useEffect(() => {
    fetchPlaces()
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = isMobile ? 1 : 4; // Number of visible images at a time 1 25 - 4 100

  const handleNext = () => {
    if (currentIndex + visibleCount < placesData.length) {
      setCurrentIndex(currentIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    }
  };

  return (
    <section className={styles.placesSection}>
      <div className={styles.header}>
        <h2>Places to Visit</h2>
      </div>
      <div className={styles.carousel}>
        {currentIndex > 0 && (
          <button
            className={`${styles.navButton} ${styles.left}`}
            onClick={handlePrev}
          >
            &lt;
          </button>
        )}
        <div className={styles.slider}>
          <div
            className={styles.cards}
            style={{
              transform: `translateX(-${currentIndex * (isMobile? 25 : 100 / visibleCount)}%)`,
              gap: isMobile ? '15px' : '20px'
            }}
          >
            {placesData.map((place, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={place.image}
                    alt={place.title}
                    fill
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{place.category}</span>
                  <h3>{place.title}</h3>
                  <p>{place.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {currentIndex + visibleCount < placesData.length && (
          <button
            className={`${styles.navButton} ${styles.right}`}
            onClick={handleNext}
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  );
};

export default PlacesSection;
