import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FaPhoneAlt, FaEnvelope, FaMapMarker } from "react-icons/fa";
import { Box, IconButton, Link } from "@mui/material";
import { HEADER_CONSTANTS, PAGES } from "@/constants/constants";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import MobileScreen from "@/utils/mobile-screen";
import useAppStore from "@/store/AppStore";

interface HeaderProps {
  handleNavigationLinks: (link: string) => void;
}

function Header({ handleNavigationLinks }: HeaderProps) {
  const { currentPage, setCurrentPage } = useAppStore();
  const isMobile = MobileScreen();

  const navigationLinks = [
    HEADER_CONSTANTS.ABOUT_US,
    HEADER_CONSTANTS.ROOMS,
    HEADER_CONSTANTS.CONTACT,
  ];

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Top Bar */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
          marginLeft: isMobile ? 0 : "150px",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {/* Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1a1a2e",
              fontSize: "30px",
              padding: "10px",
            }}
          >
            {HEADER_CONSTANTS.NAME}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Courier New", monospace',
              fontSize: "16px",
              padding: isMobile ? "10px" : 0,
            }}
          >
            {
              "The doors are open! 🚪 Come on in and book with us in person. Online? Almost there… just waiting for a few finishing touches! 🔧"
            }
          </Typography>
        </Box>

        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: isMobile ? 0 : 1,
          }}
        >
          <Link
            href={HEADER_CONSTANTS.VIEW_LOCATION_HREF}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="textSecondary"
            sx={{
              "&:hover": { color: "#c78a5c" },
              display: "flex",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <FaMapMarker />
            <Typography variant="body2">
              {HEADER_CONSTANTS.VIEW_LOCATION}
            </Typography>
          </Link>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
          >
            <FaPhoneAlt /> {HEADER_CONSTANTS.CONTACT_NO}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "5px",
            }}
          >
            <FaEnvelope /> {HEADER_CONSTANTS.EMAIL}
          </Typography>
        </Box>
      </Toolbar>

      {/* Bottom Navigation */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          padding: "10px 20px",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {currentPage === PAGES.HOME ? (
          <Box
            sx={{
              display: "flex",
              flex: 5,
              gap: "30px",
              justifyContent: "center",
              padding: isMobile ? "10px" : 0,
            }}
          >
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
        ) : (
          <Box
            sx={{
              display: "flex",
              flex: 5,
              gap: "30px",
              justifyContent: "flex-start",
              padding: isMobile ? "10px" : 0,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setCurrentPage(PAGES.HOME)}
              sx={{ mr: 2 }}
            >
              <ArrowBackIosIcon fontSize="small" />
              <Typography variant="body1" sx={{ ml: 0.5 }}>
                Home
              </Typography>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
