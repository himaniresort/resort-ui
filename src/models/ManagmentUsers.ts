import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const ManagementUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Enforce uniqueness
    password: { type: String, required: true, select: false },
    contact: { type: Number, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }, // Reference Role model
    email: { type: String, required: false },
    dob: { type: String, required: false },
    permissions: { type: [String], required: false },
  },
  { collection: "management-users", timestamps: true }
);

ManagementUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.ManagementUser ||
  mongoose.model("ManagementUser", ManagementUserSchema);
