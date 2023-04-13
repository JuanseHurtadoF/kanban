import { createSlice } from "@reduxjs/toolkit";
import { data } from "@data";
import { Board, CardProps } from "@types";
import { GlobalState } from "@types";

const initialState: GlobalState = {
  boards: [...data.boards] as Board[],
  highlightedCard: {} as CardProps,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const newColumn = action.payload;
      state.boards[0].columns.push(newColumn);
    },
    setHighlightedCard: (state, action) => {
      const card = action.payload;
      state.highlightedCard = card;
    },
  },
});

export const { addColumn, setHighlightedCard } = globalSlice.actions;
export default globalSlice.reducer;
