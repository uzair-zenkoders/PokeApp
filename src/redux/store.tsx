//Redux Toolkit import
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

//Reducers import (local)
import authReducer from "./Slices/userSlice";

//React-redux import(s)
import { TypedUseSelectorHook, useSelector } from "react-redux";

//redux persist imports(s)
import { persistStore, persistReducer } from "redux-persist";
import {
  PERSIST,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"; //for ignoring

//storage import
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

//root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});
 //sui
const whiteList = ["authReducer"];
//persist config
const persistConfig = {
  key: "root",
  storage,
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  // whitelist: whiteList,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//store
export const store = configureStore({
  reducer: {
    persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;

//..
