import { MouseEventHandler } from "react";

export type CardInfoProps = {
  onClick: MouseEventHandler<HTMLDivElement>;
};

export type CreateCardProps = {
  onClick: MouseEventHandler<HTMLDivElement>;
};

export type DeleteBoardProps = {
  onClick: () => void;
};
