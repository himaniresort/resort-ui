import AboutSection from "@/components/about";
import BlogSection from "@/components/blogs/BlogSection";
import CarouselFormSection from "@/components/carousal";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RoomCategories from "@/components/rooms/RoomCategories";
import ServicesSection from "@/components/services";
import TestimonialSlider from "@/components/testimonial";
import { HEADER_CONSTANTS } from "@/constants/constants";
import { useRef } from "react";

export default function Home() {

  const aboutUsRef = useRef<HTMLDivElement>(null);
  const roomCategoriesRef = useRef<HTMLDivElement>(null);
  const scrollViewConfig: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "start",
  }

  const handleNavigationLinks = (link: string) => {
    switch(link) {
      case HEADER_CONSTANTS.ROOMS: {
        roomCategoriesRef?.current?.scrollIntoView(scrollViewConfig);
        break;
      }
      case HEADER_CONSTANTS.ABOUT_US: {
        aboutUsRef?.current?.scrollIntoView(scrollViewConfig);
        break;
      }
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
      <Footer />
    </>
  );
}
