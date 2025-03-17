import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Grid, Card, CardContent, CardMedia, useMediaQuery, useTheme } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useRoomTypeStore from "@/store/RoomType";

const Booking = () => {

  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number>(1);
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
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

  const MAX_GUESTS_COUNT = 5;
  const MAX_ROOMS_COUNT = 8
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log('-----', theme)
  const { fetchRoomType, roomTypeData } = useRoomTypeStore();
  useEffect(() => {
    fetchRoomType()
  }, []);

  console.log("z-rooms", roomTypeData);


  const handleIncrement = (type: string) => {
    if (type === 'guest') {
      setGuests((prev) => (prev >= MAX_GUESTS_COUNT ? prev : prev + 1))
    } else {
      setRooms((prev) => (prev >= MAX_ROOMS_COUNT ? prev : prev + 1));
    }
  };
  const handleDecrement = (type: string) => {
    if (type === 'guest') {
      setGuests((prev) => (prev > 1 ? prev - 1 : 1))
    } else {
      setRooms((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((prevFilters) => {
      console.log(prevFilters, event.target)
      return prevFilters.map((filter) =>
        filter.name === event.target.name ? { ...filter, isCheked: event.target.checked } : filter
      )
    }
    );
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

  const handleReserveBooking = (roomType) => {
    console.log('Booking reserved')
  }

  const handleRoomTypeClick = (roomType) => {
    console.log(roomType)
  }



  return (
    // <Container maxWidth="xl" sx={{ mt: 4 }}>
    //   {/* Change search */}
    //   <Box>
    //     <Typography variant="h5" gutterBottom>
    //       Availability
    //     </Typography>
    //     <Box display="flex" gap={1} sx={{}}>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <DatePicker
    //           label="Check In"
    //           value={checkIn}
    //           onChange={(newValue) => setCheckIn(newValue)}
    //         />
    //         <DatePicker
    //           label="Check Out"
    //           value={checkOut}
    //           minDate={checkIn || undefined}
    //           onChange={(newValue) => setCheckOut(newValue)}
    //         />
    //       </LocalizationProvider>
    //       <Box display="flex">
    //         <Box display="flex" alignItems="center" gap={1} px={2} py={1} borderRadius={1}
    //           sx={{
    //             width: "fit-content",
    //             border: "1px solid rgba(0, 0, 0, 0.2)", // Light border initially
    //             transition: "border 0.2s ease-in-out", // Smooth transition effect
    //             "&:hover": {
    //               border: "1px solid rgba(0, 0, 0, 0.8)", // Darker border on hover
    //             },
    //           }}>
    //           <FontAwesomeIcon icon={faUser} style={{ fontSize: 24, color: "black" }} />
    //           <Button onClick={() => handleDecrement('guest')} disabled={guests === 1}>
    //             <RemoveIcon />
    //           </Button>
    //           <Typography>{guests}</Typography>
    //           <Button onClick={() => handleIncrement('guest')} disabled={guests === MAX_GUESTS_COUNT}>
    //             <AddIcon />
    //           </Button>
    //         </Box>
    //         <Box display="flex" alignItems="center" gap={1} px={2} py={1} borderRadius={1}
    //           sx={{
    //             width: "fit-content",
    //             border: "1px solid rgba(0, 0, 0, 0.2)", // Light border initially
    //             transition: "border 0.2s ease-in-out", // Smooth transition effect
    //             "&:hover": {
    //               border: "1px solid rgba(0, 0, 0, 0.8)", // Darker border on hover
    //             },
    //           }}>
    //           <FontAwesomeIcon icon={faHotel} style={{ fontSize: 24, color: "black" }} />
    //           <Button onClick={() => handleDecrement('rooms')} disabled={rooms === 1}>
    //             <RemoveIcon />
    //           </Button>
    //           <Typography>{rooms}</Typography>
    //           <Button onClick={() => handleIncrement('rooms')} disabled={rooms === MAX_ROOMS_COUNT}>
    //             <AddIcon />
    //           </Button>
    //         </Box>
    //       </Box>
    //       <Button variant="contained" color="primary"
    //         onClick={handleChangeSearch}>
    //         Change Search
    //       </Button>

    //     </Box>
    //   </Box>
    //   {/* Filter By Checkbox */}
    //   <Box>
    //     <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
    //       <FormLabel component="legend">Filter By:</FormLabel>
    //       <FormGroup>
    //         <Box sx={{ display: 'flex' }}>
    //           {filterBy.map((filter, index) => (
    //             <FormControlLabel key={index}
    //               control={
    //                 <Checkbox checked={filter.isCheked} onChange={handleChange} name={filter.name} />
    //               }
    //               label={filter.label}
    //             />
    //           ))}
    //         </Box>
    //       </FormGroup>
    //     </FormControl>
    //   </Box>
    //   {/* Rooms Card */}
    //   <Grid container >
    //     <Grid item xs={10}>
    //       {roomTypeData.map((item, index) => (
    //     <Card
    //     key={index}
    //     sx={{
    //       display: "flex",
    //       flexDirection: isMobile ? "column" : "row",
    //       alignItems: isMobile ? "center" : "flex-start",
    //       mb: 2,
    //       borderRadius: 3,
    //       boxShadow: 3,
    //       transition: "transform 0.2s, box-shadow 0.3s",
    //       "&:hover": {
    //         transform: "scale(1.02)",
    //         boxShadow: 6,
    //       },
    //       position: "relative",
    //       width: "100%",
    //       maxWidth: 600, // Ensures proper spacing on larger screens
    //       margin: "auto",
    //     }}
    //   >
    //     {/* Image Section */}
    //     <CardMedia
    //       component="img"
    //       sx={{
    //         width: isMobile ? "100%" : 250,
    //         height: isMobile ? 180 : "100%",
    //         objectFit: "cover",
    //         borderRadius: isMobile ? "8px 8px 0 0" : "8px 0 0 8px",
    //       }}
    //       image={item.image}
    //       alt={item.name}
    //     />
  
    //     {/* Content Section */}
    //     <CardContent sx={{ p: 3, width: "100%" }}>
    //       {/* View Details - Adjusted for Mobile */}
    //       <Box
    //         sx={{
    //           position: "absolute",
    //           top: 16,
    //           right: isMobile ? 12 : 16,
    //           cursor: "pointer",
    //           color: "blue",
    //           fontWeight: "bold",
    //           fontSize: isMobile ? "14px" : "16px",
    //           textDecoration: "none",
    //           "&:hover": { textDecoration: "underline" },
    //         }}
    //       >
    //         View Details
    //       </Box>
  
    //       <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
    //         {item.name}
    //       </Typography>
  
    //       <Typography variant="body2" color="text.secondary" mb={1.5}>
    //         {item.description}
    //       </Typography>
  
    //       <Typography variant="body1" fontWeight="500">
    //         <strong>Cost:</strong> ₹{item.cost} / person
    //       </Typography>
  
    //       <Typography variant="body1">
    //         <strong>Number of Nights:</strong> {numberOfNights}
    //       </Typography>
  
    //       <Typography variant="h6" color="secondary" fontWeight="bold" mt={1}>
    //         Total Cost: ₹{(item.cost * guests * rooms * numberOfNights).toLocaleString()}
    //       </Typography>
  
    //       {/* Reserve Button - Adjusted for Mobile */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: isMobile ? "center" : "flex-end",
    //           mt: 2,
    //         }}
    //       >
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           sx={{
    //             borderRadius: 2,
    //             textTransform: "none",
    //             fontSize: "16px",
    //             px: 3,
    //             py: 1,
    //             boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    //           }}
    //         >
    //           Reserve Now
    //         </Button>
    //       </Box>
  
    //       <Typography variant="caption" color="success.main" display="block" mt={1} textAlign={isMobile ? "center" : "left"}>
    //         * Confirmation is immediate
    //       </Typography>
    //     </CardContent>
  
    //     {/* Dialog for View Details */}
    //     {/* <Dialog open={open} onClose={handleClose}>
    //       <DialogTitle>{item.name}</DialogTitle>
    //       <DialogContent>
    //         <Typography>{item.description}</Typography>
    //         <Typography mt={2}>Cost per Person: ₹{item.cost}</Typography>
    //         <Typography>Available Rooms: {rooms}</Typography>
    //         <Typography>Nights: {numberOfNights}</Typography>
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={handleClose} color="primary">
    //           Close
    //         </Button>
    //       </DialogActions>
    //     </Dialog> */}
    //   </Card>
    //       ))}
    //     </Grid>
    //   </Grid>
    // </Container>
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

          {/* Guests & Rooms */}
          <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
            {/* Guests */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              px={2}
              py={1}
              borderRadius={1}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                transition: "border 0.2s ease-in-out",
                "&:hover": { border: "1px solid rgba(0, 0, 0, 0.8)" },
                justifyContent: "space-between",
              }}
              width={isMobile ? "100%" : "auto"}
            >
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 20, color: "black" }} />
              <Button onClick={() => handleDecrement("guest")} disabled={guests === 1}>
                <RemoveIcon />
              </Button>
              <Typography>{guests}</Typography>
              <Button onClick={() => handleIncrement("guest")}>
                <AddIcon />
              </Button>
            </Box>

            {/* Rooms */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              px={2}
              py={1}
              borderRadius={1}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                transition: "border 0.2s ease-in-out",
                "&:hover": { border: "1px solid rgba(0, 0, 0, 0.8)" },
                justifyContent: "space-between",
              }}
              width={isMobile ? "100%" : "auto"}
            >
              <FontAwesomeIcon icon={faHotel} style={{ fontSize: 20, color: "black" }} />
              <Button onClick={() => handleDecrement("rooms")} disabled={rooms === 1}>
                <RemoveIcon />
              </Button>
              <Typography>{rooms}</Typography>
              <Button onClick={() => handleIncrement("rooms")}>
                <AddIcon />
              </Button>
            </Box>
          </Box>

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
        flexDirection: isMobile ? "row" : "column"
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
                <Typography variant="h6" color="secondary" fontWeight="bold" mt={1}>
                  Total Cost: ₹{(roomType.cost * guests * rooms * numberOfNights).toLocaleString()}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button variant="contained" color="primary"
                    onClick={() => handleReserveBooking(roomType)}>
                    Reserve Now
                  </Button>
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
