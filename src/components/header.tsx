import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { Box } from "@mui/material";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

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
            📞 (12) 345 67890
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ✉️ mitila.meadows@gmail.com
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton size="small">
            <FacebookIcon />
          </IconButton>
          <IconButton size="small">
            <TwitterIcon />
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
          Mitila Meadows
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
          {/* Language Dropdown */}
          <Box>
            <IconButton onClick={handleLanguageClick}>
              <LanguageIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                EN
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageClose}
            >
              <MenuItem onClick={handleLanguageClose}>English</MenuItem>
              <MenuItem onClick={handleLanguageClose}>French</MenuItem>
              <MenuItem onClick={handleLanguageClose}>German</MenuItem>
            </Menu>
          </Box>
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
