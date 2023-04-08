import { createSlice } from "@reduxjs/toolkit";
import { data } from "@data";

const initialState = {
  ...data.boards,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // getData: (state) => {
    //   state = state.boards;
    // },
    addColumn: (state, action) => {
      const newColumn = action.payload;
      console.log('Hey');
      state[0].columns.push(newColumn);
    },
  },
});

export const { addColumn } = globalSlice.actions;
export default globalSlice.reducer;
