import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Grid, Card, CardContent, CardMedia, useMediaQuery, useTheme, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useRoomTypeStore from "@/store/RoomType";

const Booking = () => {

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number>(1);
  const [guests, setGuests] = useState<{ [key: string]: number }>({});
  const [rooms] = useState<number>(1);
  const [filterBy, setFilterBy] = useState([
    {
      isCheked: false,
      name: "rooms",
      label: "Rooms"
    },
    {
      isCheked: false,
      name: "available",
      label: "Available"
    }
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchRoomType, roomTypeData } = useRoomTypeStore();
  useEffect(() => {
    fetchRoomType()
  }, []);

  console.log("z-rooms", roomTypeData);

  
  const handleGuestChange = (roomType: string) => {
    return (event: SelectChangeEvent) => {
      setGuests((prev) => {
          console.log('-pr', prev)
          return ({
          ...prev, // Keep existing guest values
          [roomType]: Number(event.target.value), // Update only the selected room
        })
      });
      console.log(event, roomType)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((prevFilters) => {
      console.log(prevFilters, event.target)
      return prevFilters.map((filter) =>
        filter.name === event.target.name ? { ...filter, isCheked: event.target.checked } : filter
      )
    });
  };

  const handleChangeSearch = () => {
    console.log("Check-In Date:", checkIn?.toISOString());
    console.log("Check-Out Date:", checkOut?.toISOString());
    console.log("Guests:", guests);
    console.log("Rooms:", rooms);
    const numberOfNights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;
    setNumberOfNights(numberOfNights)
    // Add your logic to handle the data here, like making an API call
  };

  const handleReserveBooking = (roomType: any) => {
    console.log('Booking reserved', roomType)
  }

  const handleRoomTypeClick = (roomType: any) => {
    console.log(roomType)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Availability Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Availability
        </Typography>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          gap={2}
          alignItems={isMobile ? "stretch" : "center"}
        >
          {/* Date Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box width={isMobile ? "100%" : "auto"}>
              <DatePicker
                label="Check In"
                value={checkIn}
                minDate = {dayjs()}
                onChange={(newValue) => setCheckIn(newValue)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box width={isMobile ? "100%" : "auto"}>
              <DatePicker
                label="Check Out"
                value={checkOut}
                minDate={checkIn || undefined}
                onChange={(newValue) => setCheckOut(newValue)}
                sx={{ width: "100%" }}
              />
            </Box>
          </LocalizationProvider>

          {/* Search Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: isMobile ? "100%" : "auto",
              textTransform: "none",
              fontSize: "16px",
            }}
            onClick={handleChangeSearch}
          >
            Change Search
          </Button>
        </Box>
      </Box>

      {/* Filter Section */}
      <Box mt={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter By:</FormLabel>
          <FormGroup>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
              {filterBy.map((filter, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={filter.isCheked}
                      onChange={handleChange}
                      name={filter.name}
                    />
                  }
                  label={filter.label}
                />
              ))}
            </Box>
          </FormGroup>
        </FormControl>
      </Box>

      {/* Rooms Card Section */}
      <Grid container spacing={2} mt={3} sx={{
        flexDirection: isMobile ? "row" : "column",
        width: isMobile ? '100' : 10/12
      }}>
        {roomTypeData.map((roomType, index) => (
          <Grid item key={index}
          sx={{
            maxWidth: "100%",
          }}>
            
            <Card
            key={index}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  cursor: "pointer",
                  width: isMobile ? "100%" : 250,
                  height: isMobile ? 180 : "100%",
                  objectFit: "cover",
                  borderRadius: isMobile ? "8px 8px 0 0" : "8px 0 0 8px",
                }}
                image={roomType.image}
                alt={roomType.name}
                onClick={() => handleRoomTypeClick(roomType)}
              />

              <CardContent sx={{ p: 3, width: "100%" }}>
                <Typography component="span"
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.3s ease-in-out",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                  onClick={() => handleRoomTypeClick(roomType)}
                >
                  {roomType.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1.5}>
                  {roomType.description}
                </Typography>
                <Typography component="span" variant="body1">
                  <strong>Cost:</strong> ₹{roomType.cost} / person
                </Typography>
                <Typography variant="body1">
                  <strong>Number of Nights:</strong> {numberOfNights}
                </Typography>
                <Box sx={{
                  display: "flex",
                  gap: 3
                }}>
                  <Typography variant="h6" color="secondary" fontWeight="bold">
                    Total Cost: ₹{(roomType.cost * (guests[roomType.type] || 1) * rooms * numberOfNights).toLocaleString()}
                  </Typography>
                  <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                      <InputLabel>Guests</InputLabel>
                      <Select
                        labelId={`guests-${roomType.type}`}
                        id={`guests-${roomType.type}`}
                        value={guests[roomType.type]?.toString() || "1"}
                        label="Guests"
                        onChange={handleGuestChange(roomType.type)}
                        MenuProps={{
                          disablePortal: false,  // Ensures dropdown stays fixed
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                        }}
                      > 
                        {[...Array(
                          roomType.type === "deluxe" ? 6 : roomType.type === "standard" ? 4 : 2 
                        )].map((_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Button variant="contained" color="primary"
                      onClick={() => handleReserveBooking(roomType)}>
                      Reserve Now
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Booking;
