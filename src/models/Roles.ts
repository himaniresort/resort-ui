import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'roles', timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
