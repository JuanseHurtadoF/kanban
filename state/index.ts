import { createSlice } from "@reduxjs/toolkit";
import { data } from "@data";
import { CardProps } from "@types";
import { GlobalState } from "@types";

const initialState: any = {
  boardName: "Todo" as string,
  columns: data.boards[0].columns as any,
  highlightedCard: {} as CardProps,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const newColumn = action.payload;
      state.columns.push(newColumn);
    },
    setHighlightedCard: (state, action) => {
      const card = action.payload;
      state.highlightedCard = card;
    },
  },
});

export const { addColumn, setHighlightedCard } = globalSlice.actions;
export default globalSlice.reducer;
