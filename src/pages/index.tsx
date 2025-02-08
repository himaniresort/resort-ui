import AboutSection from "@/components/about";
import BlogSection from "@/components/blogs/BlogSection";
import CarouselFormSection from "@/components/carousal";
import Header from "@/components/header";
import RoomCategories from "@/components/rooms/RoomCategories";
import ServicesSection from "@/components/services";
import TestimonialSlider from "@/components/testimonial";
import { useRef } from "react";

export default function Home() {

  const aboutUsRef = useRef<HTMLDivElement>(null);
  const roomCategoriesRef = useRef<HTMLDivElement>(null);

  const handleNavigationLinks = (link: string) => {
    if (link === 'Rooms' && roomCategoriesRef.current) {
      roomCategoriesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (link === 'About Us' && aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Header handleNavigationLinks={handleNavigationLinks} />
      <CarouselFormSection />
      <AboutSection ref={aboutUsRef} />
      <ServicesSection />
      <RoomCategories ref={roomCategoriesRef} />
      <TestimonialSlider />
      <BlogSection />
    </>
  );
}
