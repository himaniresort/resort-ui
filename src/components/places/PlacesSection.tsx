import React, { useEffect, useState } from "react";
import styles from "./PlacesSection.module.scss";
import Image from 'next/image';
import { Box, Grid, Skeleton } from "@mui/material";
import usePlacesStore from "@/store/PlacesStore";
import MobileScreen from "@/utils/mobile-screen";

const PlacesSection: React.FC = () => {

  const { fetchPlaces, placesData } = usePlacesStore();
  useEffect(() => {
    fetchPlaces()
  }, []);

  const isMobile = MobileScreen();

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2; // Number of visible images at a time 2 image at 25% - 4 image at 100% scroll

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
        {!isMobile && currentIndex > 0 && (
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
              transform: `translateX(-${currentIndex * 25}%)`,
              gap: isMobile ? '15px' : '20px'
            }}
          >
            {placesData.length ?
              placesData.map((place, index) => (
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
              )) :
              [1, 2, 3, 4, 5].map(a => (
                <Grid item key={a} xs={12} sm={6} md={4}>
                  <Box sx={{ maxWidth: 450, minWidth: 350, width: "100%", mx: "auto" }}>
                    <Box>
                      <Skeleton variant="rounded" width="100%" height={200} />
                    </Box>
                    <Box sx={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      padding: "10px", backgroundColor: "white"
                    }}>
                      <Skeleton variant="rounded" width="40%" sx={{ borderRadius: '25px', fontSize: '25px' }} />
                      <Skeleton width="30%" variant="text" sx={{ fontSize: '16px' }} />
                      <Skeleton width="25%" variant="text" sx={{ fontSize: '12px' }} />
                    </Box>
                  </Box>
                </Grid>
              ))
            }
          </div>
        </div>
        {!isMobile && currentIndex + visibleCount < placesData.length && (
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
