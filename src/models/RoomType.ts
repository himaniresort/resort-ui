import mongoose from "mongoose";

enum RoomTypeEnum {
    Deluxe = "deluxe",
    Standard = "standard",
    tent = "tent",
}

const RoomTypeSchema = new mongoose.Schema(
  {
    name: { 
        type: String,
        required: true,
        unique: true,
        enum: Object.values(RoomTypeEnum)
    },
    description: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    }
  },
  { collection: "room-type", timestamps: true }
);

export default mongoose.models.RoomType || mongoose.model("RoomType", RoomTypeSchema);
