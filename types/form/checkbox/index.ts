import { MouseEventHandler } from "react";

export type CheckBoxProps = {
  title: string;
  isChecked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
