import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMonthContent, IYear } from "@utilities/interfaces/PublicInterfce";

export interface IYearState {
  years: IYear[];
  months: IMonthContent[];
}

const initialState: IYearState = {
  years: [],
  months: [],
};

const YearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    getAllYear: (state, action: PayloadAction<IYear[]>) => {
      state.years = action.payload;
    },
    getAllMonthContent: (state, action: PayloadAction<IMonthContent[]>) => {
      state.months = action.payload;
    },
  },
});

export const { getAllYear, getAllMonthContent } = YearSlice.actions;
export default YearSlice.reducer;
