/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  getStudent,
  updateImg,
  setLoading,
  getCoursesStudent,
  getCoursesStudentSingleSub,
} from "@store/slices/StudentSlice";
import { Api } from "@utilities/Api";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFile } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const GetStudentApi = (studentId: string) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get(`Student/getstudent/${studentId}`);
      dispatch(getStudent(data));
      localStorage.setItem("student", JSON.stringify(data));
    } catch (error: any) {
      console.log(error?.response.data);
    }
  };
};

export const UpdateImgApi = (
  studentId: string,
  publicId: string,
  file: FormData
) => {
  return async (dispatch: Dispatch<PayloadAction<IFile | boolean>>) => {
    try {
      dispatch(setLoading(true));
      const { data } = await Api.patch(
        `User/editImg/${studentId}/${publicId}`,
        file
      );
      const st = JSON.parse(localStorage.getItem("student") || "");
      st.user.fileUploads = data.updatedFile;
      localStorage.setItem("student", JSON.stringify(st));
      dispatch(updateImg(data.updatedFile));
      dispatch(setLoading(false));
      toast.success(data.result.statusMessage);
    } catch (error: any) {
      dispatch(setLoading(false));
      console.warn(error.response);
      toast.error(error.response.data.message || "فشل في تحديث الصوره");
    }
  };
};

export const GetCoursesToStudentApi = (studentId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ICourse[] | boolean>>) => {
    try {
      dispatch(setLoading(true));
      const { data } = await Api.get(`Course/getCoursesStudent/${studentId}`);

      dispatch(getCoursesStudent(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      console.log(error?.response);

      if (error.response.status !== 404) {
        toast.error(error.response.data.message || "لم يتم تحميل الداتا");
      }
    }
  };
};

export const GetCoursesToStudentSingleApi = (studentId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ICourse[] | boolean>>) => {
    try {
      dispatch(setLoading(true));
      const { data } = await Api.get(
        `Course/GetCoursesStudentSingle/${studentId}`
      );
      dispatch(getCoursesStudentSingleSub(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      if (error?.response?.status !== 404) {
        toast.error(error.response.data.message || "لم يتم تحميل الداتا");
      }
    }
  };
};
