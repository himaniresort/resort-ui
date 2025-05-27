import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Button, Box, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Grid, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";

import { Dayjs } from "dayjs";
import useRoomTypeStore from "@/store/RoomType";
import BookingDialog from "./BookingDialog";
import RoomTypeDialog from "./RoomTypeDialog";
import { dateChangeCheck } from "@/utils/date";
import DatePickerComponent, { DaterPickerComopentPropsType } from "../datePicker";
import MobileScreen from "@/utils/mobile-screen";
import GuestsAndRooms, { GuestsAndRoomsState, handleGuestsAndRoomChange, GuestsAndRoomsPropsType } from "./GuestsRooms";

const Booking = () => {

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number>(1);
  const [guestsAndRooms, setGuestsAndRooms] = useState<GuestsAndRoomsState>({ guests: {}, rooms: {} });
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
  const [dateError, setDateError] = useState({
    checkInError: false,
    checkOutError: false
  });

  const [openBookingDialog, setOpenBookingDialog] = useState(false)
  const [openRoomTypeDialog, setOpenRoomTypeDialog] = useState(false)

  const [roomType, setRoomType] = useState(null)

  const isMobile = MobileScreen();

  const dateSelectionRef = useRef<HTMLDivElement>(null);

  const { fetchRoomType, roomTypeData } = useRoomTypeStore();
  useEffect(() => {
    fetchRoomType()
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((prevFilters) => {
      console.log(prevFilters, event.target)
      return prevFilters.map((filter) =>
        filter.name === event.target.name ? { ...filter, isCheked: event.target.checked } : filter
      )
    });
  };

  const handleChangeSearch = () => {
    const numberOfNights = checkIn && checkOut && checkOut > checkIn ? checkOut.diff(checkIn, "day") : 1;
    setNumberOfNights(numberOfNights)
    // Add your logic to handle the data here, like making an API call
  };

  const handleReset = () => {
    setCheckIn(null)
    setCheckOut(null)
    setNumberOfNights(1)
    handleGuestsAndRoomChange(setGuestsAndRooms)()
  }

  const handleReserveBooking = (roomType: any) => {
    console.log('Booking reserved', roomType)
    const dateErrorCheck = dateChangeCheck(checkIn, checkOut);
    setDateError(dateErrorCheck);
    if (dateErrorCheck.checkInError && dateErrorCheck.checkOutError) {
      dateSelectionRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else setOpenBookingDialog(true)
  }

  const handleRoomTypeClick = (roomType: any) => {
    setOpenRoomTypeDialog(true)
    setRoomType(roomType)
  }

  const datePickerProps: DaterPickerComopentPropsType = {
    checkIn: checkIn,
    setCheckIn: setCheckIn,
    checkOut: checkOut,
    setCheckOut: setCheckOut,
    dateError: dateError,
    setDateError: setDateError
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Availability Section */}
      <Box ref={dateSelectionRef}>
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
          <DatePickerComponent datePickerProps={datePickerProps}></DatePickerComponent>

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

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: isMobile ? "100%" : "auto",
              textTransform: "none",
              fontSize: "16px",
            }}
            onClick={handleReset}
          >
            Reset
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
      {roomTypeData.length ?
        <>
          <Grid container spacing={2} mt={3} sx={{
            flexDirection: isMobile ? "row" : "column",
            width: isMobile ? '100' : 10 / 12
          }}>
            {roomTypeData.map((roomType, index) => {

              const guestsAndRoomsProps: GuestsAndRoomsPropsType = {
                roomType: roomType,
                guestsAndRooms: guestsAndRooms,
                setGuestsAndRooms: setGuestsAndRooms
              }
              return (
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
                        gap: 3,
                        flexWrap: isMobile ? 'wrap' : 'nowrap'
                      }}>
                        <Typography variant="h6" color="secondary" fontWeight="bold">
                          Total Cost: ₹{(roomType.cost * (guestsAndRooms.guests[roomType.type] || 1) * (guestsAndRooms.rooms[roomType.type] || 1) * numberOfNights).toLocaleString()}
                        </Typography>
                        <GuestsAndRooms guestsAndRoomsProps={guestsAndRoomsProps}></GuestsAndRooms>
                        <Box>
                          <Button variant="contained" color="primary"
                            onClick={() => handleReserveBooking(roomType)}>
                            Reserve
                          </Button>
                          <BookingDialog openDialog={openBookingDialog} setOpenDialog={setOpenBookingDialog}></BookingDialog>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          <RoomTypeDialog roomType={roomType} openDialog={openRoomTypeDialog} setOpenDialog={setOpenRoomTypeDialog} />
        </> :
        <Container sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}>
          <CircularProgress size="5rem" />
        </Container>}
    </Container>
  );
};

export default Booking;
