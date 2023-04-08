import { createSlice } from "@reduxjs/toolkit";
import { data } from "@data";

const initialState = {
  ...data,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    getData: (state) => {
      state = state;
    },
  },
});

export const { getData } = globalSlice.actions;
export default globalSlice.reducer;
