import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    boards: [],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
