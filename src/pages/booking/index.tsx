import React, { useRef, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

import useRoomTypeStore from "@/store/RoomType";
import DatePickerComponent from "@/components/datePicker";
import MobileScreen from "@/utils/mobile-screen";
import { useDatePickerStore } from "@/store/DatePickerStore";
import RoomTypeComponent from "@/components/booking/RoomTypes";
import { primaryButtonStyle } from "@/utils/style-settings";

const Booking = () => {
  const datePickerStore = useDatePickerStore();

  const [filterBy, setFilterBy] = useState([
    {
      isCheked: false,
      name: "rooms",
      label: "Rooms",
    },
    {
      isCheked: false,
      name: "available",
      label: "Available",
    },
  ]);

  const [dateError, setDateError] = useState({
    checkInError: false,
    checkOutError: false,
  });

  const isMobile = MobileScreen();

  const dateSelectionRef = useRef<HTMLDivElement>(null);

  const { roomTypeData } = useRoomTypeStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((prevFilters) => {
      console.log(prevFilters, event.target);
      return prevFilters.map((filter) =>
        filter.name === event.target.name
          ? { ...filter, isCheked: event.target.checked }
          : filter
      );
    });
  };

  const handleChangeSearch = () => {
    // Add your logic to handle the data here, like making an API call
  };

  const handleReset = () => {
    datePickerStore.setCheckIn(null);
    datePickerStore.setCheckOut(null);
    setDateError({
      checkInError: false,
      checkOutError: false,
    });
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
          <DatePickerComponent
            dateError={dateError}
            setDateError={setDateError}
            showNightCount={isMobile ? false : true}
          />

          {/* Search Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: isMobile ? "100%" : "auto",
              textTransform: "none",
              fontSize: "16px",
              ...primaryButtonStyle,
            }}
            onClick={handleChangeSearch}
          >
            Modify Search
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: isMobile ? "100%" : "auto",
              textTransform: "none",
              fontSize: "16px",
              ...primaryButtonStyle,
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
      {roomTypeData.length ? (
        <RoomTypeComponent />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="5rem" />
        </Container>
      )}
    </Container>
  );
};

export default Booking;
