import { combineReducers, configureStore } from "@reduxjs/toolkit";
import courseSelectedReducer from "./courseSelectedReducer";
import userDetailReducer from "./userDetailReducer";

const rootReducer = combineReducers({
  courseDetails: courseSelectedReducer,
  user: userDetailReducer,
});

export default configureStore({
  reducer: rootReducer,
});
