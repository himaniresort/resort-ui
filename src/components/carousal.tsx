import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { dateChangeCheck } from "@/utils/date";
import DatePickerComponent, { DaterPickerComopentPropsType } from "./datePicker";

const CarouselFormSection: React.FC = () => {
  // State for the form
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);
  const [guests, setGuests] = React.useState<string>("2 Adults");
  const [rooms, setRooms] = React.useState<string>("1 Room");
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

  const handleCheckAvailability = () => {
    console.log("Check-In Date:", checkIn?.toISOString());
    console.log("Check-Out Date:", checkOut?.toISOString());

    console.log("Guests:", guests);
    console.log("Rooms:", rooms);
    // Add your logic to handle the data here, like making an API call
    const dateErrorCheck = dateChangeCheck(checkIn, checkOut);
    setDateError(dateErrorCheck);
  };

  const datePickerProps: DaterPickerComopentPropsType = {
    checkIn: checkIn,
    setCheckIn: setCheckIn,
    checkOut: checkOut,
    setCheckOut: setCheckOut,
    dateError: dateError,
    setDateError: setDateError
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
          <DatePickerComponent datePickerProps={datePickerProps}></DatePickerComponent>
          <Grid item xs={12}>
            <Select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="2 Adults">2 Adults</MenuItem>
              <MenuItem value="3 Adults">3 Adults</MenuItem>
              <MenuItem value="4 Adults">4 Adults</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="1 Room">1 Room</MenuItem>
              <MenuItem value="2 Rooms">2 Rooms</MenuItem>
              <MenuItem value="3 Rooms">3 Rooms</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth
              onClick={handleCheckAvailability}>
              Check Availability
            </Button>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
};

export default CarouselFormSection;
