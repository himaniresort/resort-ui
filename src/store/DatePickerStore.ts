import { DateError, DateValue } from "@/components/datePicker";
import { create } from "zustand";

interface DatePicker {
    checkIn: DateValue;
    setCheckIn: (checkInDate: DateValue) => void;
    checkOut: DateValue;
    setCheckOut: (checkOutDate: DateValue) => void;
    dateError: DateError;
    setDateError: (dateError: DateError) => void
}

export const useDatePickerStore = create<DatePicker>()((set) => ({
    checkIn: null,
    setCheckIn: (checkInDate) => set({ checkIn: checkInDate }),
    checkOut: null,
    setCheckOut: (checkOutDate) => set({ checkOut: checkOutDate }),
    dateError: {
        checkInError: false,
        checkOutError: false
    },
    setDateError: (dateError) => set({ dateError: dateError })
}));