import { useState } from "react";
import { BOOKING } from "@/constants/constants";
import MobileScreen from "@/utils/mobile-screen";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import close icon

const steps = [
  {
    label: "User Details",
    description: "Please enter your details to proceed with the booking.",
    component: (
      <>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              type="text"
              autoComplete="name"
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="email"
            />
            <TextField
              id="outlined-required"
              label="Phone"
              type="tel"
              autoComplete="tel"
            />
            <TextField
              id="outlined-required"
              label="Location"
              type="text"
              autoComplete="off"
            />
            <TextField
              id="outlined-required"
              label="Pin Code"
              type="number"
              autoComplete="off"
            />
          </div>
        </Box>
      </>
    ),
  },
  {
    label: BOOKING.BOOKING_CONFIRMATION,
    description: BOOKING.BOOKING_CONFIRMATION_MESSAGE,
  },
];

export default function BookingDialog({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
}) {
  const isMobile = MobileScreen();

  const [activeStep, setActiveStep] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleBooking = () => {
    console.log("Booking confirmed!");
    // validation and booking logic goes here
    // need to insert data into the database
    // after successful booking, show success alert
    setSuccessAlert(true);
  };

  return (
    <Dialog
      maxWidth={isMobile ? "sm" : "lg"}
      open={openDialog}
      onClose={handleDialogClose}
      aria-labelledby="responsive-dialog-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
        }}
      >
        {BOOKING.BOOKING_CONFIRMATION}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleDialogClose}
          aria-label="close"
          sx={{
            marginLeft: "auto",
            padding: "4px",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {successAlert ? (
          <Alert variant="filled" severity="success">
            This is a filled success Alert.
          </Alert>
        ) : (
          <Box sx={{ width: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    {step.component || null}
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Confirm" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} autoFocus>
          {successAlert ? "close" : "cancel"}
        </Button>
        {!successAlert && (
          <Button variant="contained" onClick={handleBooking} autoFocus>
            Book now
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
