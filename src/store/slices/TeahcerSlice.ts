import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFile, ITeacher } from "@utilities/interfaces/PublicInterfce";

export interface IStateTeacher {
  teachers: ITeacher[];
  teacher: ITeacher | null;
  isLoading: boolean;
  Courses: ICourse[];
}
const storedData = localStorage.getItem("teacher");

const initialState: IStateTeacher = {
  teachers: [],
  teacher: storedData ? JSON.parse(storedData) : null,
  isLoading: false,
  Courses: [],
};

const TeacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    getAllTeacher: (state, action) => {
      state.teachers = action.payload;
    },
    GetOneTeacher: (state, action: PayloadAction<ITeacher | null>) => {
      state.teacher = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateImg: (state, action: PayloadAction<IFile>) => {
      if (action.payload != null && state.teacher) {
        state.teacher.user.fileUploads = action.payload;
      }
    },
    getCoursesTeacher:(state,action:PayloadAction<ICourse[]>)=>{
      state.Courses = action.payload;
    }
  },
});

export const {
  getAllTeacher,
  GetOneTeacher,
  setLoading,
  updateImg,
  getCoursesTeacher,
} = TeacherSlice.actions;
export default TeacherSlice.reducer;
