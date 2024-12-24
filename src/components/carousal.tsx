import React from "react";
import Slider from "react-slick";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const CarouselFormSection: React.FC = () => {
  // State for the form
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [guests, setGuests] = React.useState<string>("2 Adults");
  const [rooms, setRooms] = React.useState<string>("1 Room");

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue) => setCheckIn(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue) => setCheckIn(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
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
              <Button variant="contained" color="primary" fullWidth>
                Check Availability
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default CarouselFormSection;
