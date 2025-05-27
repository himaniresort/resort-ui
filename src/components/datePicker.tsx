import { SetState } from "@/types/SetState";
import { dateChangeCheck } from "@/utils/date";
import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

type DateValue = Dayjs | null;
type DateError = {
    checkInError: boolean;
    checkOutError: boolean;
}

export interface DaterPickerComopentPropsType {
    checkIn: DateValue;
    setCheckIn: SetState<DateValue>;
    checkOut: DateValue;
    setCheckOut: SetState<DateValue>;
    dateError: DateError;
    setDateError: SetState<DateError>;
}

export default function DatePickerComponent({ datePickerProps }: { datePickerProps: DaterPickerComopentPropsType }) {

    const handleDateChange = (date: Dayjs | null, type: string) => {
        let updatedCheckIn = datePickerProps.checkIn;
        let updatedCheckOut = datePickerProps.checkOut;

        if (type === 'checkIn') {
            updatedCheckIn = date;
            datePickerProps.setCheckIn(date)
        }
        else if (type === 'checkOut') {
            updatedCheckOut = date;
            datePickerProps.setCheckOut(date);
        }
        const dateErrorCheck = dateChangeCheck(updatedCheckIn, updatedCheckOut);
        datePickerProps.setDateError(dateErrorCheck);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12}>
                <DatePicker
                    label="Check In"
                    value={datePickerProps.checkIn}
                    minDate={dayjs()}
                    maxDate={datePickerProps.checkOut || undefined}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => handleDateChange(newValue, 'checkIn')}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: datePickerProps.dateError.checkInError
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <DatePicker
                    label="Check Out"
                    value={datePickerProps.checkOut}
                    minDate={datePickerProps.checkIn ? datePickerProps.checkIn : dayjs()}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => handleDateChange(newValue, 'checkOut')}
                    sx={{ width: "100%" }}
                    slotProps={{
                        textField: {
                            error: datePickerProps.dateError.checkOutError
                        },
                    }}
                />
            </Grid>
        </LocalizationProvider>
    )
}