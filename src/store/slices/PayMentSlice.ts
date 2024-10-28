import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IYearState {
  authTokenPayMent: string | null;
  status: boolean | null;
  authTokenSingleCourse: string | null;
}

const initialState: IYearState = {
  authTokenPayMent: null,
  status: null,
  authTokenSingleCourse: null,
};

const PayMentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    getAuthToken: (state, action: PayloadAction<string>) => {
      state.authTokenPayMent = action.payload;
    },
    getResultPayMent: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    getTokenSingleCourse: (state, action: PayloadAction<string>) => {
      state.authTokenSingleCourse = action.payload;
    },
    setTokenPlan: (state, action: PayloadAction<null>) => {
      state.authTokenPayMent = action.payload;
    },
  },
});

export const { getAuthToken, getResultPayMent, getTokenSingleCourse } =
  PayMentSlice.actions;
export default PayMentSlice.reducer;
