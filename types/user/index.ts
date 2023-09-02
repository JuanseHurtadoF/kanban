import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  boards: ObjectId[];
  admin: "user" | "admin";
  createdAt: string | Date;
  updatedAt: string | Date;
}
