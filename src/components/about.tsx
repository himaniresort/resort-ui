import React from "react";
import { Box, Typography, Grid, Button, Container } from "@mui/material";

const AboutSection = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      {/* Using Container to align with carousel */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Text Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{
                color: "#ff7f50",
                letterSpacing: "2px",
                fontWeight: "bold",
              }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mt: 2,
                mb: 4,
              }}
            >
              Intercontinental LA Westlake Hotel
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              Sona.com is a leading online accommodation site. We’re passionate
              about travel. Every day, we inspire and reach millions of
              travelers across 90 local websites in 41 languages.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              So when it comes to booking the perfect hotel, vacation rental,
              resort, apartment, guest house, or tree house, we have got you
              covered.
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#ff7f50",
                fontWeight: "bold",
                textTransform: "uppercase",
                mt: 2,
              }}
            >
              Read More
            </Button>
          </Grid>

          {/* Right Images Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="/about/about-1.jpg"
                  alt="Image 1"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="/about/about-2.jpg"
                  alt="Image 2"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
