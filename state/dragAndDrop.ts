import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isCardDragging: false,
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    isCardDragging: (state, action) => {
      state.isCardDragging = action.payload;
    },
  },
});

export const { isCardDragging } = dragAndDropSlice.actions;
export default dragAndDropSlice.reducer;
