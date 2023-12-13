import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types import
import { IAuthState } from "@/types/AuthState.inteface";
import { IUserPayload } from "@/types/UserPayload.interface";

type initialState = {
  value: IAuthState;
};

const initialState = {
  value: {
    isAuth: false,
    userToken: "",
    username: "",
    userEmail: "",
    userPhoto: "",
  },
} as initialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    // logIn: (state, action: PayloadAction<UserPayload>) => {
    //@ts-ignore
    logIn: (state, action: PayloadAction<IUserPayload>) => {
      return {
        value: {
          isAuth: true,
          userToken: action.payload.tokenId,
          username: action.payload.displayName,
          userEmail: action.payload.email,
          userPhoto: action.payload.photoURL,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
