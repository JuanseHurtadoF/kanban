import { ObjectId } from "mongoose";
import { MouseEventHandler } from "react";

export type CheckBoxProps = {
  title: string;
  isChecked: boolean;
  _id: string | ObjectId;
  isEditableDefault?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
