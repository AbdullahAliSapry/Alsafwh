import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExam, IExamAttemp } from "@utilities/interfaces/PublicInterfce";

export interface IExamState {
  exams: IExam[];
  isAdded: boolean;
  exam: IExam | null;
  isSubmitted: boolean;
  examAttemp: IExamAttemp |null;
}

const initialState: IExamState = {
  isAdded: false,
  exams: [],
  exam: null,
  isSubmitted: false,
  examAttemp: null,
};

const ExamSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    addExam: (state, action) => {
      state.isAdded = action.payload;
    },
    getExams: (state, action: PayloadAction<IExam[]>) => {
      state.exams = action.payload;
    },
    GetExamToLesson: (state, action: PayloadAction<IExam>) => {
      state.exam = action.payload;
    },
    submitExam: (state, action:PayloadAction<IExamAttemp |null>) => {
      state.isSubmitted = true;
      state.examAttemp = action.payload;
    },
  },
});

export const { addExam, getExams, GetExamToLesson, submitExam } = ExamSlice.actions;
export default ExamSlice.reducer;
