import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { Box } from "@mui/material";
import { HEADER_CONSTANTS } from "@/constants/constants";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";

const Header: React.FC<{ 
  handleNavigationLinks: (link: string) => void,
  showBooking: boolean,
  setShowBooking: (value: boolean) => void
}> = ({handleNavigationLinks, showBooking, setShowBooking }) => {
  const navigationLinks = [HEADER_CONSTANTS.ABOUT_US, HEADER_CONSTANTS.ROOMS, HEADER_CONSTANTS.CONTACT];
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
          marginLeft: '150px'
        }}
      >
        
        {/* Name */}
        <Box sx={{ display: "flex", flex:1, justifyContent: "center" }}>
        <Typography
            variant="h5"
            sx={{
              fontFamily: '"Lucida Handwriting", cursive',
              fontWeight: "bold",
              color: '#1a1a2e',
              fontSize: '30px'
            }}
          >
            {HEADER_CONSTANTS.NAME}
          </Typography>
        </Box>

        {/* Contact Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <FaPhoneAlt /> {HEADER_CONSTANTS.CONTACT_NO}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
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
        }}
      >

        {/* Navigation Links */}
        {!showBooking && (
          <Box sx={{ display: "flex", flex: 5, gap: "30px", justifyContent: "center" }}>
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
        <Box sx={{ display: "flex", flexShrink: 2, alignItems: "center", gap: "15px", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c78a5c",
              "&:hover": { backgroundColor: "#af7549" },
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setShowBooking(!showBooking)} 
          >
            {showBooking ? BUTTON_CONSTANTS.BACK : BUTTON_CONSTANTS.BOOKING}
          </Button>

          {/* Search Icon */}
          <IconButton>
            <FaSearch />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
