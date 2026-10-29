import mongoose from "mongoose";

enum RoomTypeEnum {
  deluxe = "deluxe",
  standard = "standard",
  single = "single",
  tent = "tent",
}

enum RoomTypeCodeEnum {
  deluxe = "DLX",
  standard = "STD",
  single = "SNG",
  tent = "TNT",
}

const RoomTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(RoomTypeEnum),
    },
    type_code: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(RoomTypeCodeEnum),
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
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { collection: "room-type", timestamps: true },
);

export default mongoose.models.RoomType ||
  mongoose.model("RoomType", RoomTypeSchema);
