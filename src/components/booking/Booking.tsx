import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Button, Box, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, CircularProgress } from "@mui/material";

import useRoomTypeStore from "@/store/RoomType";
import DatePickerComponent from "../datePicker";
import MobileScreen from "@/utils/mobile-screen";
import { handleGuestsAndRoomChange, GuestsAndRoomsState, resetValue } from "./GuestsRooms";
import { useDatePickerStore } from "@/store/DatePickerStore";
import RoomTypeComponent from "./RoomTypes";
import { useGuestsAndRoomsStore } from "@/store/GuestsAndRoomsStore";
import { primaryButtonStyle } from "@/utils/style-settings";

const Booking = () => {
  const { guests: guestsStore, rooms: roomsStore } = useGuestsAndRoomsStore();

  let gAndR: GuestsAndRoomsState = {
    guests: {},
    rooms: {}
  }
  if (guestsStore && roomsStore) {
    gAndR = {
      guests: {
        deluxe: guestsStore,
        standard: guestsStore > 4 ? 4 : guestsStore,
        tent: guestsStore > 2 ? 2 : guestsStore
      },
      rooms: {
        deluxe: roomsStore > 2 ? 2 : roomsStore,
        standard: roomsStore,
        tent: roomsStore > 3 ? 3 : roomsStore
      }
    }
  } else {
    gAndR = { guests: resetValue, rooms: resetValue }
  }

  const datePickerStore = useDatePickerStore();

  const caclucateNumberOfNights = () => {
    return (datePickerStore.checkIn && datePickerStore.checkOut) && (datePickerStore.checkOut > datePickerStore.checkIn) ? datePickerStore.checkOut.diff(datePickerStore.checkIn, "day") : 1;
  }

  const [numberOfNights, setNumberOfNights] = useState<number>(caclucateNumberOfNights());
  const [guestsAndRooms, setGuestsAndRooms] = useState<GuestsAndRoomsState>(gAndR);
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
    setNumberOfNights(caclucateNumberOfNights())
    // Add your logic to handle the data here, like making an API call
  };

  const handleReset = () => {
    datePickerStore.setCheckIn(null)
    datePickerStore.setCheckOut(null)
    setNumberOfNights(1)
    setDateError({
      checkInError: false,
      checkOutError: false
    })
    handleGuestsAndRoomChange(setGuestsAndRooms)()
  }

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
          <DatePickerComponent dateError={dateError} setDateError={setDateError}></DatePickerComponent>

          {/* Search Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: isMobile ? "100%" : "auto",
              textTransform: "none",
              fontSize: "16px",
              ...primaryButtonStyle
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
              ...primaryButtonStyle
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
            <Box sx={{ display: "flex", gap: 2 }}>
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
      {roomTypeData.length
        ? <RoomTypeComponent guestsAndRooms={guestsAndRooms} setGuestsAndRooms={setGuestsAndRooms} numberOfNights={numberOfNights} dateSelectionRef={dateSelectionRef} setDateError={setDateError}></RoomTypeComponent>
        : <Container sx={{
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
