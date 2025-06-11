import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { dateChangeCheck } from "@/utils/date";
import DatePickerComponent from "./datePicker";
import { SetState } from "@/types/SetState";
import { useDatePickerStore } from "@/store/DatePickerStore";

export interface CarouselFormSectionProps {
  showBooking: boolean,
  setShowBooking: SetState<boolean>
}

const CarouselFormSection: React.FC<CarouselFormSectionProps> = ({ showBooking, setShowBooking }: CarouselFormSectionProps) => {
  const [guests, setGuests] = React.useState<number>(2);
  const [rooms, setRooms] = React.useState<number>(1);
  const [dateError, setDateError] = useState({
    checkInError: false,
    checkOutError: false
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

  const datePickerStore = useDatePickerStore();

  const handleCheckAvailability = () => {
    console.log("Check-In Date:", datePickerStore.checkIn?.toISOString());
    console.log("Check-Out Date:", datePickerStore.checkOut?.toISOString());
    console.log("Guests and rooms", guests, rooms)

    const dateErrorCheck = dateChangeCheck(datePickerStore.checkIn, datePickerStore.checkOut);
    setDateError(dateErrorCheck);
    if (!dateErrorCheck.checkInError && !dateErrorCheck.checkOutError) {
      setShowBooking(!showBooking);
    }
  };

  const handleReset = () => {
    datePickerStore.setCheckIn(null)
    datePickerStore.setCheckOut(null)
    setDateError({
      checkInError: false,
      checkOutError: false
    })
    setGuests(2);
    setRooms(1);
  }

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
          <DatePickerComponent dateError={dateError} setDateError={setDateError}></DatePickerComponent>
          <Box sx={{ display: "flex", gap: 3, width: "100%", paddingLeft: "16px" }}>
            <Grid item xs={12}>
              <InputLabel sx={{ fontSize: "13px", position: "relative", top: '9px', left: '14px' }}>Guests</InputLabel>
              <Select
                value={guests}
                label="Guests"
                onChange={(e) => setGuests(e.target.value as number)}
                fullWidth
                displayEmpty
              >
                {[...Array(6)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ fontSize: "13px", position: "relative", top: '9px', left: '14px' }}>Rooms</InputLabel>
              <Select
                value={rooms}
                label="Rooms"
                onChange={(e) => { setRooms(e.target.value as number) }}
                fullWidth
                displayEmpty
              >
                {[...Array(6)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Box>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary"
              onClick={handleCheckAvailability}>
              Check Availability
            </Button>
            <Button variant="contained" color="primary"
              onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default CarouselFormSection;
