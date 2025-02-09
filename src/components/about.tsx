import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { ABOUT_US_CONSTANTS } from "@/constants/constants";

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
                {ABOUT_US_CONSTANTS.ABOUT_US}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mt: 2,
                  mb: 4,
                }}
              >
                {ABOUT_US_CONSTANTS.TITLE}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                {ABOUT_US_CONSTANTS.DESCRIPTION_1}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
               {ABOUT_US_CONSTANTS.DESCRIPTION_2}
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
