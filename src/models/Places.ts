import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    category: {
        type: String
    },
    distance: {
        type: String
    },
    image: {
      type: String
    }
  },
  { collection: "places", timestamps: true }
);

export default mongoose.models.Places || mongoose.model("Places", PlacesSchema);