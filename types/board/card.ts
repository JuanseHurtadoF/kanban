import { subtask } from "./subtask";
import { ObjectId } from "mongoose";

export type CardProps = {
  title: string;
  description?: string;
  status?: string;
  subtasks: subtask[];
  _id: string;
  image?: string;
  columnId?: string | ObjectId;
  imageUrl?: string | null;
  imageId?: string | null;
};
