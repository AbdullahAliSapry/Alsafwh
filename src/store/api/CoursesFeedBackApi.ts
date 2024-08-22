/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  getCoursesFeedBacks,
  setLoading,
} from "@store/slices/CoursesFeedBackSlice";
import { Api } from "@utilities/Api";
import { IFeedBackCourse } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const AddFeedBackCoursesApi = (
  FeedBackData: Omit<IFeedBackCourse, "id" | "isConfirmed" | "user">,
  message: string
) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      dispatch(setLoading(true));
      const { data } = await Api.post(
        "CoursesFeedBack/addFeedBackCourse",
        FeedBackData
      );
      dispatch(setLoading(false));
      toast.success(message);
    } catch (error: any) {
      dispatch(setLoading(false));
      console.log(error?.response);
    }
  };
};
export const GetAllCoursesFeedBackApi = (CourseId: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<IFeedBackCourse[] | boolean>>
  ) => {
    try {
      dispatch(setLoading(true));
      const { data } = await Api.get(
        `CoursesFeedBack/getAllFeedBack/${CourseId}`
      );

      dispatch(setLoading(false));
      dispatch(getCoursesFeedBacks(data));
    } catch (error: any) {
      dispatch(setLoading(false));
      console.log(error?.response);
    }
  };
};
