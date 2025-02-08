import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";
import { Box } from "@mui/material";
import { HEADER_CONSTANTS } from "@/constants/constants";
import { BUTTON_CONSTANTS } from "@/constants/button-constants";

const Header: React.FC<{ handleNavigationLinks: (link: string) => void }> = ({
  handleNavigationLinks,
}) => {
  const navigationLinks = [HEADER_CONSTANTS.HOME, HEADER_CONSTANTS.ABOUT_US, HEADER_CONSTANTS.ROOMS, HEADER_CONSTANTS.CONTACT];
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      {/* Top Bar */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
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

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton size="small">
            <FaFacebookF />
          </IconButton>
          <IconButton size="small">
            <FaInstagram />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Bottom Navigation */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          padding: "10px 20px",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "serif",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {HEADER_CONSTANTS.NAME}
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: "30px" }}>
          {navigationLinks.map(
            (link, index) => (
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
            )
          )}
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c78a5c",
              "&:hover": { backgroundColor: "#af7549" },
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            {BUTTON_CONSTANTS.BOOKING}
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
