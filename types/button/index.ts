import { MouseEventHandler } from "react";

export type ButtonProps = {
  variant: "primaryLg" | "primarySm" | "secondary" | "destructive";
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
