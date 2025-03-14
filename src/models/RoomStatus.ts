import mongoose from "mongoose";

enum RoomStatusEnum {
    Open = "open",
    Booked = "booked",
    Pending = "pending",
}

const RoomStatusSchema = new mongoose.Schema(
  {
    description: { 
        type: String,
        required: true,
        unique: true,
        enum: Object.values(RoomStatusEnum)
    },
  },
  { collection: "room-status", timestamps: true }
);

export default mongoose.models.RoomStatus || mongoose.model("RoomStatus", RoomStatusSchema);
