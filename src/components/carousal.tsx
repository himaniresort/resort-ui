import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Button, Grid, Typography } from "@mui/material";
import DatePickerComponent from "./datePicker";
import { useDatePickerStore } from "@/store/DatePickerStore";
import { useGuestsAndRoomsStore } from "@/store/GuestsAndRoomsStore";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { primaryButtonStyle } from "@/utils/style-settings";
import { PAGES } from "@/constants/constants";

interface CarouselFormSectionProps {
  setCurrentPage: (page: string) => void;
}

function CarouselFormSection({ setCurrentPage }: CarouselFormSectionProps) {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useDatePickerStore();
  const { setGuests, setRooms } = useGuestsAndRoomsStore();

  const [dateError, setDateError] = useState({
    checkInError: false,
    checkOutError: false,
  });

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleCheckAvailability = () => setCurrentPage(PAGES.BOOKING);

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setDateError({
      checkInError: false,
      checkOutError: false,
    });
    setGuests(1);
    setRooms(1);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Carousel */}
      <Slider {...settings}>
        <Box
          sx={{
            height: "100vh",
            backgroundImage: "url('/hero/hero-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            height: "100vh",
            backgroundImage: "url('/hero/hero-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            height: "100vh",
            backgroundImage: "url('/hero/hero-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Slider>

      {/* Form Section */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "5%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "90%", sm: "60%", md: "30%" },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Booking Your Hotel
        </Typography>
        <Grid container spacing={2}>
          <DatePickerComponent
            dateError={dateError}
            setDateError={setDateError}
          />
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              sx={primaryButtonStyle}
              onClick={handleReset}
            >
              {BUTTON_CONSTANTS.RESET}
            </Button>
            <Button
              variant="contained"
              sx={primaryButtonStyle}
              onClick={handleCheckAvailability}
              disabled={
                !checkIn ||
                !checkOut ||
                dateError.checkInError ||
                dateError.checkOutError
              }
            >
              {BUTTON_CONSTANTS.CHECK_AVAILABILITY}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CarouselFormSection;
