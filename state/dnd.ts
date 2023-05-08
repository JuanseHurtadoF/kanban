import { createSlice, current } from "@reduxjs/toolkit";

const initialState: any = {
  isCardDragging: false,
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    setIsCardDragging: (state, action) => {
      state.isCardDragging = action.payload;
    },
  },
});

export const { setIsCardDragging } = dragAndDropSlice.actions;
export default dragAndDropSlice.reducer;
