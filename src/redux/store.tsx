//Redux Toolkit import
import { configureStore } from "@reduxjs/toolkit";

//Reducers import (local)
import authReducer from "./Slices/userSlice";

//React-redux import(s)
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
