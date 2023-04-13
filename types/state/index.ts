import { BoardProps, CardProps } from "@types";

export type RootState = {
  global: GlobalState;
};

export type GlobalState = {
  boards: BoardProps[];
  highlightedCard: CardProps;
};
