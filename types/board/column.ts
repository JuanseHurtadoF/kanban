import { CardProps } from "@types";
import { ObjectId } from "mongoose";

// front
export type ColumnProps = {
  name: string;
  tasks: CardProps[];
  _id: ObjectId | string;
};

// back
export type ColumnData = {
  _id: ObjectId;
  name: string;
  boardId: ObjectId;
  tasks: ObjectId[];
  createdAt: string | Date;
  updatedAt: string | Date;
};
