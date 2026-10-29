import { useEffect, useState } from "react";
import { BOOKING } from "@/constants/constants";
import MobileScreen from "@/utils/mobile-screen";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { CreatedBooking, UserData } from "@/types/Bookings";
import { RoomType } from "@/types/RoomType";
import { useDatePickerStore } from "@/store/DatePickerStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useBookingStore from "@/store/BookingStore";
import { generateBookingReference } from "@/utils/booking";

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
  const { isLoading, createBooking } = useBookingStore();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    dob: null,
    phone: "",
    location: "",
    pinCode: "",
  });
  const [formValid, setFormValid] = useState<boolean>(false);
  const [isConfirmClicked, setIsConfirmClicked] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<CreatedBooking | null>(
    null,
  );
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const isFormValid = Object.entries(formData).every(([, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    });
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

  const steps = [
    {
      label: "User Details",
      description: "Please enter your details to proceed with the booking.",
      component: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

              <DatePicker
                label="Date of Birth"
                value={formData.dob}
                maxDate={checkOut || undefined}
                format="DD/MM/YYYY"
                onChange={(value) => handleInputChange(value, "dob")}
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
                type="pin"
                autoComplete="off"
                value={formData.pinCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "pinCode")
                }
              />
            </div>
          </Box>
        </LocalizationProvider>
      ),
    },
    {
      label: BOOKING.BOOKING_CONFIRMATION,
      description: BOOKING.BOOKING_CONFIRMATION_MESSAGE,
    },
  ];

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | Dayjs
      | null,
    field: keyof UserData,
  ) => {
    let value: string | Dayjs | null = null;
    if (field === "dob") {
      value =
        event &&
        typeof event === "object" &&
        "isValid" in event &&
        (event as Dayjs).isValid()
          ? (event as Dayjs)
          : null;
    } else {
      if (
        event &&
        typeof event === "object" &&
        "target" in event &&
        event.target
      ) {
        value = (event.target as HTMLInputElement).value;
      } else {
        value = "";
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleBooking = async () => {
    if (formValid) {
      const formatDate = (date: Dayjs | null) =>
        date && typeof date === "object" && "format" in date
          ? (date as Dayjs).format("DD/MM/YYYY")
          : "";

      const payload = {
        userData: {
          ...formData,
        },
        bookingData: {
          roomTypeId: roomType?.roomTypeId,
          bookingReferenceId: generateBookingReference(roomType?.type_code),
          rooms: Number(roomsSelected),
          guests: Number(guestsSelected),
          checkIn: formatDate(checkIn),
          checkOut: formatDate(checkOut),
          status: "pending",
        },
      };
      setBookingError(null);
      try {
        const booking = await createBooking(payload);
        setCreatedBooking(booking);
        setSuccessAlert(true);
      } catch (error) {
        setBookingError(
          error instanceof Error ? error.message : "Error creating booking",
        );
      }
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
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {successAlert ? (
              <Alert variant="filled" severity="success">
                Booking request submitted <br />
                Your booking reference ID is:{" "}
                {createdBooking?.bookingReferenceId}
                <br />
                Please keep this ID for payment and confirmation of your
                booking.
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
                            Continue
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
            {bookingError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {bookingError}
              </Alert>
            )}
          </>
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
            disabled={!isConfirmClicked || isLoading}
          >
            {isLoading ? "Booking..." : "Book now"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
