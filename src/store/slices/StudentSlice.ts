import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFile } from "@utilities/interfaces/PublicInterfce";
import { IStudent } from "@utilities/interfaces/StudentInterfce";

export interface IStartState {
  student: IStudent | null;
  loading: boolean;
  studentCourses: ICourse[];
}

const storedData = localStorage.getItem("student");

const initialState: IStartState = {
  student: storedData ? JSON.parse(storedData) : null,
  loading: false,
  studentCourses: [],
};

const StudentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
    getStudent: (state, action) => {
      state.student = action.payload;
    },
    updateImg: (state, action: PayloadAction<IFile>) => {
      if (action.payload != null && state.student) {
        state.student.user.fileUploads = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getCoursesStudent: (state, action: PayloadAction<ICourse[]>) => {
      state.studentCourses = action.payload;
    },
  },
});

export const { getStudent, updateImg, setLoading, getCoursesStudent } =
  StudentSlice.actions;

export default StudentSlice.reducer;
