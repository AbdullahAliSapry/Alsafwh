import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProblemState {
  isLoading: boolean;
  isAdded: boolean;
}

const initialState: IProblemState = {
  isLoading: false,
  isAdded: false,
};

const Problem = createSlice({
  name: "problem",
  initialState,
  reducers: {
    addProblem: (
      state,
      action: PayloadAction<{ loading: boolean; added: boolean }>
    ) => {
      state.isLoading = action.payload.loading;
      state.isAdded = action.payload.added;
    },
  },
});

export const { addProblem } = Problem.actions;

export default Problem.reducer;
