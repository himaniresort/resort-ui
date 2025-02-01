import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box } from "@mui/material";

const Header: React.FC = () => {
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
          <Typography variant="body2" color="textSecondary">
            📞 (+91)9380002949
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ✉️ mithilameadows25@gmail.com
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton size="small">
            <FacebookIcon />
          </IconButton>
          <IconButton size="small">
            <InstagramIcon />
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
          Mithila Meadows
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: "30px" }}>
          {["Home", "Rooms", "About Us", "Pages", "News", "Contact"].map(
            (link, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: "#000",
                  "&:hover": { borderBottom: "2px solid #c78a5c" },
                }}
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
            BOOKING NOW
          </Button>

          {/* Search Icon */}
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
