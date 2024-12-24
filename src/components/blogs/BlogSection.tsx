import React, { useState } from "react";
import styles from "./BlogSection.module.scss";

interface Blog {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

const blogs: Blog[] = [
  {
    title: "Tremblant In Canada",
    date: "15th April, 2019",
    category: "Travel Trip",
    imageUrl: "/blogs/blog-1.jpg",
  },
  {
    title: "Choosing A Static Caravan",
    date: "15th April, 2019",
    category: "Camping",
    imageUrl: "/blogs/blog-2.jpg",
  },
  {
    title: "Copper Canyon",
    date: "21th April, 2019",
    category: "Event",
    imageUrl: "/blogs/blog-3.jpg",
  },
  {
    title: "Trip To Iqaluit In Nunavut A Canadian Arctic City",
    date: "08th April, 2019",
    category: "Event",
    imageUrl: "/blogs/blog-4.jpg",
  },
  {
    title: "Traveling To Barcelona",
    date: "12th April, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-5.jpg",
  },
  {
    title: "Trip To New York",
    date: "5th May, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-6.jpg",
  },
  {
    title: "Exploring Iceland",
    date: "21st June, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-7.jpg",
  },
  {
    title: "Exploring Iceland",
    date: "21st June, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-8.jpg",
  },
  {
    title: "Exploring Iceland",
    date: "21st June, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-9.jpg",
  },
  {
    title: "Exploring Iceland",
    date: "21st June, 2019",
    category: "Travel",
    imageUrl: "/blogs/blog-10.jpg",
  },
];

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4; // Number of visible blogs at a time

  const handleNext = () => {
    if (currentIndex + visibleCount < blogs.length) {
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
        <span>HOTEL NEWS</span>
        <h2>Our Blog & Event</h2>
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
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {blogs.map((blog, index) => (
              <div className={styles.card} key={index}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${blog.imageUrl})` }}
                ></div>
                <div className={styles.content}>
                  <span className={styles.category}>{blog.category}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {currentIndex + visibleCount < blogs.length && (
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
