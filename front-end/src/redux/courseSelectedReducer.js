import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courseSelectedDetails: {},
  myCourseList: [{}],
};
const profileSlice = createSlice({
  name: "courseSelected",
  initialState,
  reducers: {
    addCourseDetails(state, action) {
      state.courseSelectedDetails = { ...action?.payload };
    },
    addToMyCourse(state, action) {
      state.myCourseList = {
        ...state,
        myCourseList: [...state?.myCourseList, action?.payload],
      };
    },
  },
});

export const { addCourseDetails, addToMyCourse } = profileSlice.actions;
export default profileSlice.reducer;
