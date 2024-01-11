import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isCardInfoOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleCardInfoModal: (state, action) => {
      console.log("here");
      state.isCardInfoOpen = action.payload;
    },
  },
});

export const { toggleCardInfoModal } = modalsSlice.actions;
export default modalsSlice.reducer;
