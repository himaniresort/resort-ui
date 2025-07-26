import { Dayjs } from "dayjs";

export const dateChangeCheck = (
  updatedCheckIn: Dayjs | null,
  updatedCheckOut: Dayjs | null
) => ({
  checkInError:
    !updatedCheckIn || (updatedCheckIn && !updatedCheckIn.isValid()),
  checkOutError:
    !updatedCheckOut || (updatedCheckOut && !updatedCheckOut.isValid()),
});

export const calculateNumberOfNights = (
  checkIn: Dayjs | null,
  checkOut: Dayjs | null
) => {
  return checkIn && checkOut && checkOut > checkIn
    ? checkOut.diff(checkIn, "day")
    : 1;
};
