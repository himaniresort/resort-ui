import mongoose from "mongoose";
import RoomStatus from "./RoomStatus"; // Import the RoomStatus model

const RoomSchema = new mongoose.Schema(
  {
    roomNo: { type: String, required: true, unique: true },
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType", required: true },
    status: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "RoomStatus", 
      default: async function () { 
        const openStatus = await RoomStatus.findOne({ description: "open" }); 
        return openStatus ? openStatus._id : null; // Return RoomStatusId of "open"
      },
      required: true
    },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: null },
  },
  { collection: "rooms", timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
