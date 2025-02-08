import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaBaby,
  FaTshirt,
  FaCar,
  FaCocktail,
} from "react-icons/fa";

const services = [
  {
    title: "Travel Plan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "Catering Service",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaUtensils />,
  },
  {
    title: "Babysitting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaBaby />,
  },
  {
    title: "Laundry",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaTshirt />,
  },
  {
    title: "Hire Driver",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaCar />,
  },
  {
    title: "Bar & Drink",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    icon: <FaCocktail />,
  },
];

const ServicesSection = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="overline"
          sx={{
            color: "#ff7f50",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          WHAT WE DO
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mt: 2,
          }}
        >
          Discover Our Services
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                backgroundColor: "#fdfdfd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#ffefdf",
                  transform: "translateY(-10px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  color: "#ff7f50",
                  mb: 2,
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "#d65b35",
                  },
                }}
              >
                {service.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "#d65b35",
                  },
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  lineHeight: 1.8,
                }}
              >
                {service.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
