/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  editOnAvailability,
  getAllLessions,
  getAllLessionsToCourse,
  getLesson,
  makeCompleted,
} from "@store/slices/LessonSlice";
import { Api } from "@utilities/Api";
import {
  ILesson,
  IStudentCourseProgressDto,
} from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const GetLessonsStudentApi = (
  courseId: string,
  studentId: string,
  isSingle: boolean
) => {
  return async (dispatch: Dispatch<PayloadAction<ILesson[]>>) => {
    try {
      const { data } = await Api.get(
        `Lession/getLessionsCourseStudent/${courseId}/${studentId}?isSingle=${isSingle}`
      );
      dispatch(getAllLessions(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const GetLessonsCourseApi = (courseId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ILesson[]>>) => {
    try {
      const { data } = await Api.get(`Lession/GetLessonsToCourse/${courseId}`);
      dispatch(getAllLessionsToCourse(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const GetLessonApi = (LessonId: string) => {
  return async (dispatch: Dispatch<PayloadAction<ILesson>>) => {
    try {
      const { data } = await Api.get(`Lession/getlession/${LessonId}`);
      dispatch(getLesson(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const AddWatchApi = (LessonId: string, UserId: string) => {
  return async (
    dispatch: Dispatch<
      PayloadAction<{
        isCompleted: boolean;
        isAvilable: boolean;
        isLimited: boolean;
        Count:number;
      }>
    >
  ) => {
    try {
      const { data } = await Api.get(
        `StudentWatchingLessions/AddWatch/${UserId}/${LessonId}`
      );    
      dispatch(
        editOnAvailability({
          isAvilable: data.isAvilable,
          isCompleted: data.completed,
          isLimited: data.isLimited,
          Count: data.count,
        })
      );
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};

export const MakeCompletedApi = (LessonId: string, studentId: number) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.patch(
        `StudentWatchingLessions/makeCompleted/${studentId}/${LessonId}`
      );
      toast.success("make completed successfully");
      dispatch(makeCompleted(data.completed));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const EditProgressApi = (
  Data: Omit<
    IStudentCourseProgressDto,
    "id" | "completedLessons" | "totalLessons" | "progress"
  >
) => {
  return async () => {
    try {
      await Api.post(
        `StudentCourseProgress/updateProgress`,
        Data
      );
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};
