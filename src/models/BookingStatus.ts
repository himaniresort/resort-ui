import mongoose from "mongoose";

enum BookingStatusEnum {
    Confirmed = "confirmed",
    Cancelled = "cancelled",
    PendingConfirmation = "pending_confirmation",
    PendingCancellation = "pending_cancellation",
    Checkout = "checkout"
}

const BookingStatusSchema = new mongoose.Schema(
  {
    description: { 
        type: String,
        required: true,
        unique: true,
        enum: Object.values(BookingStatusEnum)
    },
  },
  { collection: "booking-status", timestamps: true }
);

export default mongoose.models.BookingStatus || mongoose.model("BookingStatus", BookingStatusSchema);
