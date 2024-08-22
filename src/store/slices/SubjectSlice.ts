import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { ISubject } from "@utilities/interfaces/PublicInterfce";

export interface ISingleMateriel extends ISubject {
  courses: ICourse[];
}

export interface IStateSubject {
  subjects: ISubject[];
  subject: ISingleMateriel | null;
}

const initialState: IStateSubject = {
  subjects: [],
  subject: null,
};

const SubjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    getAllSubject: (state, action) => {
      state.subjects = action.payload;
    },
    getSingleMateriel: (state, action) => {
      state.subject = action.payload;
      // state.subjects.find((s) => s.id === action.payload) || null;
    },
  },
});

export const { getAllSubject, getSingleMateriel } = SubjectSlice.actions;
export default SubjectSlice.reducer;
