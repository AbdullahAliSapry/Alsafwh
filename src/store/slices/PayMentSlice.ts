import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoupon } from "@utilities/interfaces/PublicInterfce";

export interface IYearState {
  authTokenPayMent: string;
  status: boolean | null;
}

const initialState: IYearState = {
  authTokenPayMent: "",
  status: null,
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

  },
});

export const { getAuthToken, getResultPayMent } = PayMentSlice.actions;
export default PayMentSlice.reducer;
