import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField } from '@mui/material';
import { Bookings } from '@/pages/api/bookings';
import dayjs from 'dayjs';
import { ROOMS_CATEGORIES } from '@/constants/constants';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Bookings[]>([]);

  const handleLogin = ()   => {
    if (username === 'admin' && password === 'password') { // Replace with actual authentication logic
      setIsLoggedIn(true);
      setLoginModalOpen(false);
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const recentBookingsTableHeader = ['Guest Name', 'Contact', 'Room', 'Status', 'Check-In', 'Check-Out', 'No. of rooms']

  return (
    <Box sx={{ flexGrow: 1, p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Login Modal */}
      <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Admin Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Modal>

      {isLoggedIn && (
        <>
          {/* App Bar */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Resort Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Summary Cards */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Card sx={{ flex: 1, mx: 1 }}>
              <CardContent>
                <Typography variant="h6">Total Bookings</Typography>
                <Typography variant="h4">120</Typography>
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
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{booking.username}</TableCell>
                    <TableCell>{booking.contact}</TableCell>
                    <TableCell>{booking.roomType === ROOMS_CATEGORIES.TENT
                      ? ROOMS_CATEGORIES.TENT_HOUSE 
                      : booking.roomType === ROOMS_CATEGORIES.HUT 
                        ? ROOMS_CATEGORIES.HUT_HOUSE
                        : ROOMS_CATEGORIES.PREMIUM_HUT_HOUSE}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>{dayjs(booking.checkIn).format("DD-MM-YYYY")}</TableCell>
                    <TableCell>{dayjs(booking.checkOut).format("DD-MM-YYYY")}</TableCell>
                    <TableCell>{booking.noOfRooms}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Admin Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1 }}>
              Manage Users
            </Button>
            <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1 }}>
              Manage Services
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard;
