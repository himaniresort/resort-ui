import { useDatePickerStore } from "@/store/DatePickerStore";
import { SetState } from "@/types/SetState";
import { calculateNumberOfNights, dateChangeCheck } from "@/utils/date";
import { Grid, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import { useEffect } from "react";

export type DateValue = Dayjs | null;
export type DateError = {
  checkInError: boolean;
  checkOutError: boolean;
};

export default function DatePickerComponent({
  dateError,
  setDateError,
  showNightCount = false,
}: {
  dateError?: DateError;
  setDateError?: SetState<DateError>;
  showNightCount?: boolean;
}) {
  const {
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    numberOfNights,
    setNumberOfNights,
  } = useDatePickerStore();

  useEffect(() => {
    if (checkIn && checkOut) {
      const numberOfNights = calculateNumberOfNights(checkIn, checkOut);
      setNumberOfNights(numberOfNights);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut]);

  const handleDateChange = (date: DateValue, type: string) => {
    let updatedCheckIn = checkIn;
    let updatedCheckOut = checkOut;

    switch (type) {
      case "checkIn":
        updatedCheckIn = date;
        setCheckIn(updatedCheckIn);
        break;
      case "checkOut":
        updatedCheckOut = date;
        setCheckOut(updatedCheckOut);
        break;
      default:
        break;
    }
    if (setDateError) {
      const dateErrorCheck = dateChangeCheck(updatedCheckIn, updatedCheckOut);
      setDateError(dateErrorCheck);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12}>
        <DatePicker
          label="Check In"
          value={checkIn}
          minDate={dayjs()}
          maxDate={checkOut || undefined}
          format="DD/MM/YYYY"
          onChange={(newValue) => handleDateChange(newValue, "checkIn")}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError?.checkInError,
            },
          }}
        />
      </Grid>
      {showNightCount && numberOfNights > 0 && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <NightsStayOutlinedIcon fontSize="small" />
          <Typography variant="body1">
            {numberOfNights} {numberOfNights === 1 ? "Night" : "Nights"}
          </Typography>
        </Stack>
      )}
      <Grid item xs={12}>
        <DatePicker
          label="Check Out"
          value={checkOut}
          minDate={checkIn ? checkIn : dayjs()}
          format="DD/MM/YYYY"
          onChange={(newValue) => handleDateChange(newValue, "checkOut")}
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              error: dateError?.checkOutError,
            },
          }}
        />
      </Grid>
    </LocalizationProvider>
  );
}
