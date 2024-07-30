// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
