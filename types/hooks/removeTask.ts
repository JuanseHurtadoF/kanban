import { ObjectId } from "mongoose";

export type RemoveTaskProps = {
  taskId: ObjectId;
  columnId: ObjectId;
};
