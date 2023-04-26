import { createSlice } from "@reduxjs/toolkit";
import { dataTest } from "@data";
import { CardProps } from "@types";

const initialState: any = {
  allBoards: [],
  currentUser: "64494cb5850f3117d277a749",
  activeBoard: {},
  columns: dataTest.boards[0].columns as any,
  highlightedCard: {} as CardProps,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      const boards = action.payload;
      state.allBoards = boards;
      state.activeBoard = boards[0];
    },
    setActiveBoard: (state, action) => {
      const boardId = action.payload;
      state.activeBoard = state.allBoards.find(
        (board: any) => board._id === boardId
      );
    },
    addBoardLocal: (state, action) => {
      console.log("here");
      const newBoard = action.payload;
      state.allBoards.push(newBoard);
    },
    removeBoardLocal: (state, action) => {
      const boardId = action.payload;
      state.allBoards = state.allBoards.filter(
        (board: any) => board._id !== boardId
      );
    },
    addColumn: (state, action) => {
      const newColumn = action.payload;
      state.allBoards = [...state.allBoards, newColumn];
    },
    setHighlightedCard: (state, action) => {
      const card = action.payload;
      state.highlightedCard = card;
    },
  },
});

export const {
  setBoards,
  setActiveBoard,
  addBoardLocal,
  removeBoardLocal,
  addColumn,
  setHighlightedCard,
} = globalSlice.actions;
export default globalSlice.reducer;
