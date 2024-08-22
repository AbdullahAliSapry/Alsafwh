import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQustion } from "@utilities/interfaces/PublicInterfce";

export interface IQuestionState {
  questions: IQustion[];
  isAdded: boolean;
  question: IQustion | null;
  loading: boolean;
}

const initialState: IQuestionState = {
  isAdded: false,
  questions: [],
  question: null,
  loading: false,
 
};

const QuestionSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    addQuestion: (
      state,
      action: PayloadAction<{ question: IQustion|null ; Added: boolean; loading:boolean }>
    ) => {
      state.question = action.payload.question;
      state.isAdded = action.payload.Added;
      state.loading = action.payload.loading;
    },
  },
});

 export const { addQuestion} = QuestionSlice.actions;
export default QuestionSlice.reducer;
