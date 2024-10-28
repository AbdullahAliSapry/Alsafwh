import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { ICoupon } from "@utilities/interfaces/PublicInterfce";

export interface IStateCourse {
  courses: ICourse[];
  count: number;
  coursesFilter: ICourse[];
  courseModern: ICourse[];
  AllCourses: ICourse[];
  course: ICourse | null;
  isFiltered: boolean;
  rateToCourse: number;
  isActiveCode: boolean;
  coupon: ICoupon | null;
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
  isActiveCode: false,
  coupon: null,
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
    editRate: (state, action: PayloadAction<number>) => {
      state.rateToCourse = action.payload;
    },
    getCodeDiscount: (
      state,
      action: PayloadAction<{ active: boolean; coupon: ICoupon }>
    ) => {
      state.isActiveCode = action.payload.active;
      state.coupon = action.payload.coupon;
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
  getCodeDiscount,
} = CourseSlice.actions;
export default CourseSlice.reducer;
