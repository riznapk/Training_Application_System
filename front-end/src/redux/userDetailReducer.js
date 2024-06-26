import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo(state, action) {
      state.user = { ...action?.payload };
    },
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
