import { createSlice } from "@reduxjs/toolkit";
import { dataTest } from "@data";
import { CardProps } from "@types";

const initialState: any = {
  allBoards: [],
  activeBoard: dataTest.boards[0] as any,
  columns: dataTest.boards[0].columns as any,
  highlightedCard: {} as CardProps,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const newBoard = action.payload;
      state.boards.push(newBoard);
    },
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
