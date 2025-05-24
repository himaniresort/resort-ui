import AboutSection from "@/components/about";
import Booking from "@/components/booking/Booking";
import CarouselFormSection from "@/components/carousal";
import FooterSection from "@/components/footer/FooterSection";
import Header from "@/components/header";
import PlacesSection from "@/components/places/PlacesSection";
import RoomCategories from "@/components/rooms/RoomCategories";
import ServicesSection from "@/components/services";
import TestimonialSlider from "@/components/testimonial/TestimonialSlider";
import { HEADER_CONSTANTS } from "@/constants/constants";
import { useRef, useState } from "react";

export default function Home() {

  const [showBooking, setShowBooking] = useState(false);

  const aboutUsRef = useRef<HTMLDivElement>(null);
  const roomCategoriesRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);

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
      case HEADER_CONSTANTS.CONTACT: {
        contactUsRef?.current?.scrollIntoView(scrollViewConfig);
        break;
      }
    }
  };

  return (
    <>
      <Header handleNavigationLinks={handleNavigationLinks} showBooking={showBooking}
        setShowBooking={setShowBooking} />
      
      {showBooking ? (
        <Booking />
      ) : (
        <>
          <CarouselFormSection />
          <AboutSection ref={aboutUsRef} />
          <ServicesSection />
          <RoomCategories ref={roomCategoriesRef} />
          <TestimonialSlider />
          <PlacesSection />
        </>
      )}

      <FooterSection ref={contactUsRef}/>
    </>
  );
}
