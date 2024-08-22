import { createSlice } from "@reduxjs/toolkit";
import { IFeedBack } from "@utilities/interfaces/PublicInterfce";

export interface IStateFeedback {
  isLoading: boolean;
  isSubmitted: boolean;
  feedbacks: IFeedBack[];
}
const initialState: IStateFeedback = {
  isLoading: false,
  isSubmitted: false,
  feedbacks: [],
};

const FeedBackSlice = createSlice({
  name: "Feedback",
  initialState,
  reducers: {
    addFeedback: (state, action) => {
      state.isLoading = action.payload.loading;
      state.isSubmitted = action.payload.submit;
    },
    getFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
  },
});

export const { addFeedback, getFeedbacks } = FeedBackSlice.actions;
export default FeedBackSlice.reducer;
