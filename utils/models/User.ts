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
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;