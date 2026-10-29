import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useBookingStore from "@/store/BookingStore";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();
  const { fetchBooking, bookings } = useBookingStore();

  useEffect(() => {
    fetchBooking();
  }, []);

  console.log("z-bookings", bookings);

  const recentBookingsTableHeader = [
    "Guest Name",
    "Contact",
    "Room",
    "Status",
    "Check-In",
    "Check-Out",
    "No. of rooms",
    "No. of guests",
    "Booking Reference ID",
    "Actions",
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Resort Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{bookings.length || 0}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography variant="h6">Available Rooms</Typography>
            <Typography variant="h4">15</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4">8</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Bookings */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recent Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {recentBookingsTableHeader.map((tableHeader, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {tableHeader}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.userName}</TableCell>
                <TableCell>{booking.userContact}</TableCell>
                <TableCell>{booking.roomName}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{booking.rooms}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{booking.bookingReferenceId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() =>
                      router.push(
                        `/booking-details/${booking.bookingReferenceId}`,
                      )
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Admin Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1 }}>
          Manage Users
        </Button>
        <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1 }}>
          Manage Services
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
