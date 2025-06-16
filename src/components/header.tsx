import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarker,
} from "react-icons/fa";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import { HEADER_CONSTANTS } from "@/constants/constants";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";
import { useGuestsAndRoomsStore } from "@/store/GuestsAndRoomsStore";
import { useDatePickerStore } from "@/store/DatePickerStore";

const Header: React.FC<{
  handleNavigationLinks: (link: string) => void,
  showBooking: boolean,
  setShowBooking: (value: boolean) => void
}> = ({ handleNavigationLinks, showBooking, setShowBooking }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigationLinks = [HEADER_CONSTANTS.ABOUT_US, HEADER_CONSTANTS.ROOMS, HEADER_CONSTANTS.CONTACT];
  const { setGuests, setRooms } = useGuestsAndRoomsStore();
  const { setCheckIn, setCheckOut } = useDatePickerStore();

  const handleOnClick = () => {
    setShowBooking(!showBooking)
    if (!showBooking) {
      setGuests(1)
      setRooms(1)
      setCheckIn(null)
      setCheckOut(null)
    }
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}
      sx={{
        backgroundColor: '#f9f9f9'
      }}>
      {/* Top Bar */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          marginLeft: isMobile ? 0 : '150px',
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >

        {/* Name */}
        <Box sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          flex: 1,
          justifyContent: "center",
        }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: '#1a1a2e',
              fontSize: '30px',
              padding: "10px"
            }}
          >
            {HEADER_CONSTANTS.NAME}
          </Typography>
          <Typography sx={{
            fontFamily: '"Courier New", monospace',
            fontSize: '16px',
            padding: isMobile ? "10px" : 0
          }}>🛠️ Under construction, but not underwhelming! We’re almost ready to welcome you — both online and in person.</Typography>
        </Box>

        {/* Contact Info */}
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: isMobile ? 0 : 1
        }}>
          <Link
            href={HEADER_CONSTANTS.VIEW_LOCATION_HREF}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="textSecondary"
            sx={{ "&:hover": { color: "#c78a5c" }, display: "flex", alignItems: "center", padding: "5px" }}
          >
            <FaMapMarker />
            <Typography variant="body2">{HEADER_CONSTANTS.VIEW_LOCATION}</Typography>
          </Link>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px" }}
          >
            <FaPhoneAlt /> {HEADER_CONSTANTS.CONTACT_NO}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center", gap: "2px", padding: "5px" }}
          >
            <FaEnvelope /> {HEADER_CONSTANTS.EMAIL}
          </Typography>
        </Box>
      </Toolbar>

      {/* Bottom Navigation */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: showBooking ? "flex-end" : "center",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          padding: "10px 20px",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >

        {/* Navigation Links */}
        {!showBooking && (
          <Box sx={{ display: "flex", flex: 5, gap: "30px", justifyContent: "center", padding: isMobile ? "10px" : 0 }}>
            {navigationLinks.map((link, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: "#000",
                  "&:hover": { borderBottom: "2px solid #c78a5c" },
                }}
                onClick={() => handleNavigationLinks(link)}
              >
                {link}
              </Typography>
            ))}
          </Box>
        )}

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", flexShrink: 2, alignItems: "center", gap: "15px", justifyContent: "flex-end", padding: isMobile ? "10px" : 0 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c78a5c",
              "&:hover": { backgroundColor: "#af7549" },
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleOnClick}
          >
            {showBooking ? BUTTON_CONSTANTS.BACK : BUTTON_CONSTANTS.BOOKING}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
