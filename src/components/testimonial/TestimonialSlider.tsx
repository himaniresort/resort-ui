import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./TestimonialSlider.module.scss";

interface Testimonial {
  name: string;
  text: string;
  rating: number; // Rating between 0-5
}

const testimonials: Testimonial[] = [
  {
    name: "Preethi, Mysuru",
    text: "My husband, my daughter and I needed a place to stay for a few nights. They offered good and hygine stay and absolutely love our vacation at Mithila Meadows.",
    rating: 5,
  },
  {
    name: "Harishchandra Jain, Udupi",
    text: "Mithila Meadows was the perfect escape for my family. The staff was welcoming, and the amenities were top-notch. We'll definitely come back again.",
    rating: 4,
  },
  {
    name: "Ramesh Gowda, Hasana",
    text: "A fantastic experience overall. The rooms were clean, and the service was excellent. Highly recommend to anyone looking for a luxury stay.",
    rating: 4.5,
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <div className={styles.testimonialSlider}>
      <h2>What Customers Say?</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Automatically slide every 3 seconds
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        modules={[Autoplay, Pagination]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className={styles.testimonial}>
              <p>{testimonial.text}</p>
              <div className={styles.rating}>
                {"★".repeat(Math.floor(testimonial.rating))}
                {testimonial.rating % 1 !== 0 && "★".slice(0, 1)}{" "}
                {/* Half star */}
              </div>
              <p className={styles.name}>- {testimonial.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
