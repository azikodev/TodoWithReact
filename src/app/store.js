import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/counter/counterSlice.js";

export const store = configureStore({
  reducer: {
    todosState: todoReducer,
  },
});
