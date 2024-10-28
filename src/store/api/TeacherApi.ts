/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllTeacher,
  getCoursesTeacher,
  GetOneTeacher,
  setCountSubscriptions,
  setLoading,
  updateImg,
} from "@store/slices/TeahcerSlice";
import { Api } from "@utilities/Api";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFile, ITeacher } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const GetAllTeacherApi = () => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get("Teacher/getteachers");
      dispatch(getAllTeacher(data));
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  };
};

export const GetTeacherApi = (UserId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ITeacher | null>>) => {
    try {
      const { data } = await Api.get(`Teacher/getTeacher/${UserId}`);
      localStorage.setItem("teacher", JSON.stringify(data));
      dispatch(GetOneTeacher(data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const UpdateImgApiTeacher = (
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
      const st = JSON.parse(localStorage.getItem("teacher") || "");
      st.user.fileUploads = data.updatedFile;
      localStorage.setItem("teacher", JSON.stringify(st));
      dispatch(updateImg(data.updatedFile));
      dispatch(setLoading(false));
      toast.success(data.result.statusMessage);
    } catch (error: any) {
      dispatch(setLoading(false));
      toast.error(error.response.data.message || "فشل في تحديث الصوره");
    }
  };
};

export const GetTeacherCoursesApi = (UserId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ICourse[]>>) => {
    try {
      const { data } = await Api.get(`Course/getCoursesToTeacher/${UserId}`);
      dispatch(getCoursesTeacher(data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};


export const GetCountToTeacher = (teacherId: string) => {
  return async (dispatch: Dispatch<PayloadAction<number>>) => {
    try {
      const { data } = await Api.get(`Teacher/getsubscription/${teacherId}`);
      dispatch(setCountSubscriptions(data.count));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};
