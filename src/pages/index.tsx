import AboutSection from "@/components/about";
import BlogSection from "@/components/blogs/BlogSection";
import CarouselFormSection from "@/components/carousal";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RoomCategories from "@/components/rooms/RoomCategories";
import ServicesSection from "@/components/services";
import TestimonialSlider from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Header />
      <CarouselFormSection />
      <AboutSection />
      <ServicesSection />
      <RoomCategories />
      <TestimonialSlider />
      <BlogSection />
      <Footer />
    </>
  );
}
