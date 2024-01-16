import { MouseEventHandler } from "react";

export type ButtonProps = {
  variant:
    | "primaryLg"
    | "primarySm"
    | "secondary"
    | "secondarySm"
    | "tertiary"
    | "destructive";
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};
