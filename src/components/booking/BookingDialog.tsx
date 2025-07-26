import { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { BookingData } from "@/types/Bookings";
import { RoomType } from "@/types/RoomType";
import { useDatePickerStore } from "@/store/DatePickerStore";

export default function BookingDialog({
  openDialog,
  setOpenDialog,
  roomType,
  roomsSelected,
  guestsSelected,
}: {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  roomType: RoomType | null;
  roomsSelected: string;
  guestsSelected: string;
}) {
  const isMobile = MobileScreen();

  const { checkIn, checkOut } = useDatePickerStore();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    pinCode: "",
  });
  const [formValid, setFormValid] = useState<boolean>(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (isFormValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData]);

  useEffect(() => {
    if (activeStep === steps.length) {
      setIsConfirmClicked(true);
    } else {
      setIsConfirmClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

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
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "name")
                }
              />
              <TextField
                required
                id="outlined-email-input-required"
                label="Email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "email")
                }
              />
              <TextField
                required
                id="outlined-required"
                label="Phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "phone")
                }
              />
              <TextField
                required
                id="outlined-required"
                label="Location"
                type="text"
                autoComplete="off"
                value={formData.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "location")
                }
              />
              <TextField
                required
                id="outlined-required"
                label="Pin Code"
                type="number"
                autoComplete="off"
                value={formData.pinCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "pinCode")
                }
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

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof BookingData
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
  };

  const handleBooking = () => {
    if (formValid) {
      const payload = {
        ...formData,
        roomTypeId: roomType?.roomTypeId,
        roomsSelected,
        guestsSelected,
        checkIn,
        checkOut,
      };
      console.log("z-Booking details:", payload);
      // need to insert data into the database
      // after successful booking, show success alert
      setSuccessAlert(true);
    }
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
            Booking request submitted.
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
                        disabled={!formValid}
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
                  Click on &quot;Book Now&quot; to confirm your booking.
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
          <Button
            variant="contained"
            onClick={handleBooking}
            autoFocus
            disabled={!isConfirmClicked}
          >
            Book now
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
