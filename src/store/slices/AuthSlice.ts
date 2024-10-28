import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthModel } from "@utilities/interfaces/AuthInterface";
import { Cookies } from "react-cookie";
export interface StateInterface {
  IsRegistered: boolean;
  IsLoading: boolean;
  IsConfirmed: boolean;
  MessageConfirmed: string | null;
  AuthModel: IAuthModel | null;
  isChanged: boolean;
  isSending: boolean ;
}

const cookies = new Cookies();
const AuthModelStored = cookies.get("authModel");

const initialState: StateInterface = {
  IsRegistered: false,
  IsLoading: false,
  IsConfirmed: false,
  MessageConfirmed: null,
  AuthModel: AuthModelStored ? AuthModelStored : null,
  isChanged: false,
  isSending: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIn: (state, action) => {
      state.IsRegistered = action.payload.IsRegistered;
      state.IsLoading = action.payload.IsLoading;
    },
    ConfirmEmail: (state, action) => {
      state.IsConfirmed = action.payload.status;
      state.MessageConfirmed = action.payload.message;
    },
    ResetConfirmEmail: (state) => {
      state.IsConfirmed = false;
      state.MessageConfirmed = null;
    },
    LogIn: (state, action) => {
      state.IsRegistered = false;
      state.AuthModel = action.payload;
    },
    changePassword: (
      state,
      action: PayloadAction<{ IsLoading: boolean; isChanged: boolean }>
    ) => {
      state.isChanged = action.payload.isChanged;
      state.IsLoading = action.payload.IsLoading;
    },
    setIsSending: (state, action:PayloadAction<boolean>) => {
      state.isSending = action.payload;
    }
  },
});

export const {
  SignIn,
  ConfirmEmail,
  ResetConfirmEmail,
  setIsSending,
  LogIn,
  changePassword,
} = AuthSlice.actions;

export default AuthSlice.reducer;
