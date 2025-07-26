import Header from "@/components/header";
import FooterSection from "@/components/footer/FooterSection";
import CarouselFormSection from "@/components/carousal";
import RoomCategories from "@/components/rooms/RoomCategories";
import ServicesSection from "@/components/our-services/servicesSection";
import PlacesSection from "@/components/places/PlacesSection";
import AboutSection from "@/components/about";
import TestimonialSlider from "@/components/testimonial/TestimonialSlider";
import { HEADER_CONSTANTS, PAGES } from "@/constants/constants";
import { useRef } from "react";
import Booking from "@/pages/booking";
import useAppStore from "@/store/AppStore";

export default function Home() {
  const { currentPage, setCurrentPage } = useAppStore();
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const roomCategoriesRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);

  const scrollViewConfig: ScrollIntoViewOptions = {
    behavior: "smooth",
    block: "start",
  };

  const handleNavigationLinks = (link: string) => {
    switch (link) {
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

  const getLandingPage = (page: string) => {
    switch (page) {
      case PAGES.BOOKING:
        return <Booking />;

      default:
        return (
          <>
            <CarouselFormSection setCurrentPage={setCurrentPage} />
            <AboutSection ref={aboutUsRef} />
            <ServicesSection />
            <RoomCategories ref={roomCategoriesRef} />
            <TestimonialSlider />
            <PlacesSection />
          </>
        );
    }
  };

  return (
    <>
      <Header handleNavigationLinks={handleNavigationLinks} />
      {getLandingPage(currentPage)}
      <FooterSection ref={contactUsRef} />
    </>
  );
}
