import { useDatePickerStore } from "@/store/DatePickerStore";
import { SetState } from "@/types/SetState";
import { dateChangeCheck } from "@/utils/date";
import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export type DateValue = Dayjs | null;
export type DateError = {
    checkInError: boolean;
    checkOutError: boolean;
}

export default function DatePickerComponent({ dateError, setDateError }: { dateError?: DateError, setDateError?: SetState<DateError> }) {

    const datePickerStore = useDatePickerStore();

    const handleDateChange = (date: DateValue, type: string) => {
        let updatedCheckIn = datePickerStore.checkIn;
        let updatedCheckOut = datePickerStore.checkOut;

        if (type === 'checkIn') {
            updatedCheckIn = date;
            datePickerStore.setCheckIn(updatedCheckIn);
        }
        else if (type === 'checkOut') {
            updatedCheckOut = date;
            datePickerStore.setCheckOut(updatedCheckOut)
        }
        if (setDateError) {
            const dateErrorCheck = dateChangeCheck(updatedCheckIn, updatedCheckOut);
            setDateError(dateErrorCheck);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12}>
                <DatePicker
                    label="Check In"
                    value={datePickerStore.checkIn}
                    minDate={dayjs()}
                    maxDate={datePickerStore.checkOut || undefined}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => handleDateChange(newValue, 'checkIn')}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: dateError?.checkInError
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <DatePicker
                    label="Check Out"
                    value={datePickerStore.checkOut}
                    minDate={datePickerStore.checkIn ? datePickerStore.checkIn : dayjs()}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => handleDateChange(newValue, 'checkOut')}
                    sx={{ width: "100%" }}
                    slotProps={{
                        textField: {
                            error: dateError?.checkOutError
                        },
                    }}
                />
            </Grid>
        </LocalizationProvider>
    )
}