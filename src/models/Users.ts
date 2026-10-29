import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
