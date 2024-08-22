import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILesson } from "@utilities/interfaces/PublicInterfce";

export interface IStateCourse {
  Lessons: ILesson[];
  AllLessonsCourse: ILesson[];
  Lesson: ILesson | null;
  isAvilable: boolean | null;
  isCompleted: boolean;
  isLimited: boolean;
}

const initialState: IStateCourse = {
  Lessons: [],
  AllLessonsCourse: [],
  Lesson: null,
  isAvilable: true,
  isCompleted: false,
  isLimited: false,
};

const LessonSlice = createSlice({
  name: "Lesson",
  initialState,
  reducers: {
    getAllLessions: (state, action: PayloadAction<ILesson[]>) => {
      state.Lessons = action.payload;
    },
    getAllLessionsToCourse: (state, action: PayloadAction<ILesson[]>) => {
      state.AllLessonsCourse = action.payload;
    },
    getLesson: (state, action: PayloadAction<ILesson>) => {
      state.Lesson = action.payload;
    },
    editOnExamPublished: (state, action: PayloadAction<string>) => {
      const index = state.Lessons.findIndex(
        (lesson) => lesson.id === action.payload
      );
      if (index > -1) {
        if (state.Lessons[index].containQuize && state.Lessons[index].quize) {
          state.Lessons[index].quize.isPubliched = true;
        }
      }
    },
    editOnAvailability: (
      state,
      action: PayloadAction<{ isCompleted: boolean; isAvilable: boolean,isLimited:boolean }>
    ) => {
      state.isAvilable = action.payload.isAvilable;
      state.isCompleted = action.payload.isCompleted;
      state.isLimited = action.payload.isLimited;
    },
    makeCompleted: (state, action:PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
  },
});

export const {
  getAllLessions,
  getAllLessionsToCourse,
  getLesson,
  editOnExamPublished,
  editOnAvailability,
  makeCompleted,
} = LessonSlice.actions;
export default LessonSlice.reducer;
