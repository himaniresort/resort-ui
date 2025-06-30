import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ServicesDialog from "./servicesDialog";
import { servicesList } from "./servicesList";
import { SERVICES_SECTION } from "@/constants/constants";

interface ServicesSection {
  id: string | null,
  title: string,
  description: string,
  icon: React.JSX.Element
}

const ServicesSection = () => {
  const [openServiceDialog, setOpenServiceDialog] = useState<boolean>(false)
  const [serviceState, setServiceState] = useState<string | null>(null)

  const handleServiceClick = (service: ServicesSection) => {
    console.log(service)
    setOpenServiceDialog(true)
    setServiceState(service.id)
  }

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
          {SERVICES_SECTION.WHAT_WE_DO}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mt: 2,
          }}
        >
          {SERVICES_SECTION.DISCOVER_OUR_SERVICES}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {servicesList.map((service) => (
          <Grid key={service.id} item xs={12} sm={6} md={4}>
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
                  cursor: "pointer"
                },
              }}
              onClick={() => handleServiceClick(service)}
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
        <ServicesDialog service={serviceState} openDialog={openServiceDialog} setOpenDialog={setOpenServiceDialog} />
      </Grid>
    </Box>

  );
};

export default ServicesSection;
