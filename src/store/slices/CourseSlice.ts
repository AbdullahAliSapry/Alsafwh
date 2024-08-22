import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFeedBackCourse } from "@utilities/interfaces/PublicInterfce";

export interface IStateCourse {
  courses: ICourse[];
  count: number;
  coursesFilter: ICourse[];
  courseModern: ICourse[];
  AllCourses: ICourse[];
  course: ICourse | null;
  isFiltered: boolean;
  rateToCourse: number;
}

const initialState: IStateCourse = {
  courses: [],
  courseModern: [],
  AllCourses: [],
  count: 0,
  coursesFilter: [],
  course: null,
  isFiltered: false,
  rateToCourse: 0,
};

const CourseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    getAllCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
    getAllCoursesCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    Filter: (state, action: PayloadAction<ICourse[]>) => {
      state.coursesFilter = action.payload;
      state.isFiltered = true;
    },
    ClearFilter: (state) => {
      state.coursesFilter = [];
      state.isFiltered = false;
    },
    getSingleCourse: (state, action: PayloadAction<ICourse>) => {
      state.course = action.payload;
    },
    getModernCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courseModern = action.payload;
    },
    editRate: (state, action: PayloadAction<IFeedBackCourse[]>) => {      
      state.rateToCourse =
        action.payload.reduce((acc, curr) => acc + curr.rate, 0) /
        action.payload.length;
    },
  },
});

export const {
  getAllCourses,
  getAllCoursesCount,
  Filter,
  ClearFilter,
  getSingleCourse,
  getModernCourses,
  editRate,
} = CourseSlice.actions;
export default CourseSlice.reducer;
