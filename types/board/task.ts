import { ObjectId } from "mongoose";

export type TaskData = {
  _id: ObjectId;
  title: string;
  description: string;
  board: ObjectId;
  column: ObjectId;
  user: ObjectId;
  subtasks: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
};
