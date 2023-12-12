import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  value?: AuthState;
};

interface UserPayload {
  userToken: string;
  username: string;
  userEmail: string;
  userPhoto: string;
}

type AuthState = {
  isAuth: boolean;
  userToken: String;
  username?: string;
  userEmail: string;
  userPhoto?: string;
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
    logIn: (state, action: any) => {
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
