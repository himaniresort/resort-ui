import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";

const AboutSection = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref}>
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
                Mithila Meadows: A Home Away From Home
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Welcome to Mithila Meadows Homestay, your perfect getaway nestled in the heart of nature. We offer a serene and comfortable stay for tourists looking to relax and explore the beauty of the surroundings. Our homestay offers a variety of activities to make your stay memorable, including fun-filled mud games, indoor games and outdoor games. Guests can indulge in authentic Mangalorean cuisine, prepared with care and traditional flavors. Enjoy a refreshing swim in our pool or embark on nearby sightseeing adventures, including exciting trekking trails and visits to local pilgrimage spots.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Whether you're seeking relaxation or adventure, Mithila Meadows Homestay promises a unique and enriching experience for every traveler.
                When it comes to booking the perfect homestay, vacation, resort, or getaway, we’ve got you covered. Your memorable escape starts here at Mithila Meadows!
              </Typography>
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
    </div>
  )
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
