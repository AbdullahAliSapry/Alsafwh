import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IFeedBackCourse,
} from "@utilities/interfaces/PublicInterfce";

export interface IStateComment {
  CoursesFeedBacks: IFeedBackCourse[];
  loading: boolean;
}

const initialState: IStateComment = {
  CoursesFeedBacks: [],
  loading: false,
};

const CoursesFeedBackSlice = createSlice({
  name: "coursesFeedBack",
  initialState,
  reducers: {
    getCoursesFeedBacks: (state, action: PayloadAction<IFeedBackCourse[]>) => {
      state.CoursesFeedBacks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { getCoursesFeedBacks, setLoading } = CoursesFeedBackSlice.actions;
export default CoursesFeedBackSlice.reducer;
