import { Dayjs } from "dayjs";

export const dateChangeCheck = (updatedCheckIn: Dayjs | null, updatedCheckOut: Dayjs | null) => {
    if (!updatedCheckIn && !updatedCheckOut) {
        return {
            checkInError: true,
            checkOutError: true
        };
    } else if (!updatedCheckIn && updatedCheckOut) {
        return {
            checkInError: true,
            checkOutError: false
        };
    } else if (updatedCheckIn && !updatedCheckOut) {
        return {
            checkInError: false,
            checkOutError: true
        };
    } else {
        return {
            checkInError: false,
            checkOutError: false
        };
    }
}