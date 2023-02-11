import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  time: 0,
  next: 1,
  true: {
    xat: 0,
    togri:0,
  },
};

const Slice = createSlice({
  name: "date",
  initialState,
  reducers: {
    Vaqt(state, action) {
      if (state.time > 0) state.time -= state.time
     state.time += action.payload;
    },
    Next(state, action) {
     state.next += action.payload;
    },
    Tugri(state, action) {
      if(action.payload * 1 === 0) state.true.xat++;
      if(action.payload * 1 === 1) state.true.togri++;
      
    },
  },
});
export const { Vaqt, Next, Tugri } = Slice.actions;
export default Slice.reducer;
