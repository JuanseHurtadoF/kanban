import { Board, CardProps } from "@types";

export type RootState = {
  global: GlobalState;
};

export type GlobalState = {
  boards: Board[];
  highlightedCard: CardProps;
};
