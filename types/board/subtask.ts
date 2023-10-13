import { ObjectId } from "mongoose";

export type subtask = {
  title: string;
  isCompleted: boolean;
  taskId?: ObjectId;
  _id?: ObjectId;
};
