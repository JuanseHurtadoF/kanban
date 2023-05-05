import { MouseEventHandler } from "react";

export type NavProps = {
  toggleNewCard: MouseEventHandler<HTMLButtonElement>;
  toggleDeleteModal: MouseEventHandler<HTMLDivElement>;
};