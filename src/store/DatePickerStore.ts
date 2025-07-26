import { DateValue } from "@/components/datePicker";
import { create } from "zustand";

interface DatePicker {
  checkIn: DateValue;
  setCheckIn: (checkInDate: DateValue) => void;
  checkOut: DateValue;
  setCheckOut: (checkOutDate: DateValue) => void;
  numberOfNights: number;
  setNumberOfNights: (nights: number) => void;
}

export const useDatePickerStore = create<DatePicker>()((set) => ({
  checkIn: null,
  setCheckIn: (checkInDate) => set({ checkIn: checkInDate }),
  checkOut: null,
  setCheckOut: (checkOutDate) => set({ checkOut: checkOutDate }),
  numberOfNights: 0,
  setNumberOfNights: (nights) => set({ numberOfNights: nights }),
}));
