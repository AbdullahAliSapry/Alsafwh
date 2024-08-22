/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  editRate,
  Filter,
  getAllCourses,
  getAllCoursesCount,
  getModernCourses,
  getSingleCourse,
} from "@store/slices/CourseSlice";
import { Api } from "@utilities/Api";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { IFeedBackCourse, IFilter } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
};

export const GetAllCoursesApi = (
  page: number = 0,
  take: number = 0,
  filter: IFilter | null = null
) => {
  return async (dispatch: Dispatch<PayloadAction<ICourse[]>>) => {
    try {
      const filterQueryString = filter ? `&${buildQueryString(filter)}` : "";
      const { data } = await Api.get(
        `Course/getAll?page=${page}&take=${take}${filterQueryString}`
      );
      if (filter) {
        console.log("enter");

        dispatch(Filter(data));
      } else {
        dispatch(getAllCourses(data));
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error in getting all courses"
      );
    }
  };
};

export const GetCountCoursesApi = () => {
  return async (dispatch: Dispatch<PayloadAction<number>>) => {
    try {
      const { data } = await Api.get(`Course/getCountToAllCourses`);

      dispatch(getAllCoursesCount(data.count));
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in get Count Courses");
    }
  };
};

export const GetSingleCourse = (id: string) => {
  return async (
    dispatch: Dispatch<PayloadAction<ICourse | IFeedBackCourse[]>>
  ) => {
    try {
      const { data } = await Api.get(`Course/getById/${id}`);

      dispatch(getSingleCourse(data));
      dispatch(editRate(data.coursesFeedBacks));
    } catch (error: any) {
      console.log(error.response);
    }
  };
};

export const GetCourseModern = () => {
  return async (dispatch: Dispatch<PayloadAction<ICourse[]>>) => {
    try {
      const { data } = await Api.get(
        `Course/getAll?page=${1}&take=${4}&sort=true`
      );
      dispatch(getModernCourses(data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in get All Courses");
    }
  };
};
