import { ObjectId } from "mongoose";
import { ColumnProps } from "..";

export type AddColumnProps = {
  boardId: ObjectId;
  column: ColumnProps;
};
