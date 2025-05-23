import React, { useState } from "react";
import styles from "./BlogSection.module.scss";
import Image from 'next/image';
import { useMediaQuery, useTheme } from "@mui/material";

interface Places {
  title: string;
  distance: string;
  category: string;
  imageUrl: string;
}

const places: Places[] = [
  {
    title: "Dharmasthala Temple",
    distance: "5km",
    category: "Pilgrimage",
    imageUrl: "/nearbyplaces/dharmastala.jpg",
  },
  {
    title: "Surya Temple",
    distance: "5km",
    category: "Pilgrimage",
    imageUrl: "/nearbyplaces/surya.jpg",
  },
  {
    title: "Gadai Kallu",
    distance: "5km",
    category: "Trek",
    imageUrl: "/nearbyplaces/gadai_kalu.webp",
  },
  {
    title: "Kadamagundi Falls",
    distance: "5km",
    category: "Falls",
    imageUrl: "/nearbyplaces/kadamagundi_falls.jpg",
  },
  {
    title: "Ermai Falls",
    distance: "5km",
    category: "Falls",
    imageUrl: "/nearbyplaces/ermail_falls.jpg",
  },
  {
    title: "Southadka Temple",
    distance: "60km",
    category: "Pilgrimage",
    imageUrl: "/nearbyplaces/soutadka.jpg",
  },
  {
    title: "Karinja Temple",
    distance: "50km",
    category: "Pilgrimage",
    imageUrl: "/nearbyplaces/karinja.jpg",
  },
  {
    title: "Devaramane",
    distance: "50km",
    category: "Trek",
    imageUrl: "/nearbyplaces/devaramane.jpg",
  },
  {
    title: "Kalasa",
    distance: "80km",
    category: "Trek",
    imageUrl: "/nearbyplaces/kalasa.jpg",
  },
  {
    title: "Kukke Subramanya Temple",
    distance: "70km",
    category: "Piligrimage",
    imageUrl: "/nearbyplaces/kukke_subramanya1.png",
  },
  {
    title: "Shishila Temple",
    distance: "70km",
    category: "Piligrimage",
    imageUrl: "/nearbyplaces/SHISHILA_Temple.webp",
  },
  {
    title: "Rani Jhari",
    distance: "80km",
    category: "Trek",
    imageUrl: "/nearbyplaces/rani_jhari.jpg",
  },
  {
    title: "Netravathi Peak",
    distance: "80km",
    category: "Trek",
    imageUrl: "/nearbyplaces/Netravathi-Peak-Trek.png",
  },
  {
    title: "Kyatanamakki Hills",
    distance: "80km",
    category: "Trek",
    imageUrl: "/nearbyplaces/Kyatanamakki-Hills.jpg",
  },
];

const BlogSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = isMobile ? 1 : 4; // Number of visible blogs at a time 1 25 4 100

  const handleNext = () => {
    if (currentIndex + visibleCount < places.length) {
      setCurrentIndex(currentIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    }
  };

  return (
    <section className={styles.blogSection}>
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
            {places.map((place, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={place.imageUrl}
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
        {currentIndex + visibleCount < places.length && (
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

export default BlogSection;
