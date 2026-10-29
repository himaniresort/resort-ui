import { Bookings } from "@/types/Bookings";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function BookingDetails() {
  const router = useRouter();
  const [booking, setBooking] = useState<Bookings>({} as Bookings);

  const { bookingReferenceId } = router.query;

  useEffect(() => {
    if (bookingReferenceId) {
      fetchBookingDetails(bookingReferenceId as string);
    }
  }, [bookingReferenceId]);

  const fetchBookingDetails = async (bookingReferenceId: string) => {
    try {
      const response = await fetch(
        `/api/bookings/${encodeURIComponent(bookingReferenceId)}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "Failed to fetch booking details");
      }
      setBooking(data.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Resort Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Booking Details
        </Typography>
        <Card elevation={2}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Booking Reference
                </Typography>
                <Typography variant="h6">
                  {booking.bookingReferenceId || bookingReferenceId || "—"}
                </Typography>
              </Box>
              {booking.status && (
                <Chip
                  label={booking.status}
                  color={booking.status === "confirmed" ? "success" : "warning"}
                  size="small"
                />
              )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            {[
              [
                ["Guest Name", booking.userName],
                ["Contact", booking.userContact],
                ["Room Type", booking.roomName],
              ],
              [
                ["Check-In", booking.checkIn],
                ["Check-Out", booking.checkOut],
              ],
              [
                ["No. of Rooms", booking.rooms],
                ["No. of Guests", booking.guests],
              ],
            ].map((row, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                  mb: rowIndex < 2 ? 2.5 : 0,
                }}
              >
                {row.map(([label, value]) => (
                  <Box key={label}>
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {value || "—"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default BookingDetails;
