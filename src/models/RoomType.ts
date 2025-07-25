import mongoose from "mongoose";

enum RoomTypeEnum {
  deluxe = "deluxe",
  standard = "standard",
  single = "single",
  tent = "tent",
}

const RoomTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(RoomTypeEnum),
    },
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    max_occupancy: {
      type: Number,
    },
    total_rooms: {
      type: Number,
    },
    cost: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { collection: "room-type", timestamps: true }
);

export default mongoose.models.RoomType ||
  mongoose.model("RoomType", RoomTypeSchema);
