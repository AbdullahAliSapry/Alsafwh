/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthToken,
  getResultPayMent,
  getTokenSingleCourse,
} from "@store/slices/PayMentSlice";
import { Api } from "@utilities/Api";
import {
  IPayMentHandlerData,
  IPayMentSendingData,
} from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const CreatePayMentApi = (Data: IPayMentSendingData) => {
  return async (dispatch: Dispatch<PayloadAction<string>>) => {
    try {
      const { data } = await Api.post("Payment/create-payment", Data);
      dispatch(getAuthToken(data.paymentToken));
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const HandlerPayMent = (Data: IPayMentHandlerData) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.post("Payment/handle-redirect", Data);
      dispatch(getResultPayMent(data.success));
    } catch (error: any) {
      if (error.response.status == 404) {
        throw new Error("Invalid redirect");
      }
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const CreatePayMentSingleCourse = (
  StudnetId: string,
  CourseId: string,
  CouponeId?: string
) => {
  return async (dispatch: Dispatch<PayloadAction<string>>) => {
    try {
      const { data } = await Api.post(`Payment/create-payment/singleCourse`, {
        StudnetId,
        CourseId,
        CouponeId,
      });
      dispatch(getTokenSingleCourse(data.key));
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const HandlerPayMentSingleCourseApi = (Data: IPayMentHandlerData) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.post(
        "Payment/handle-redirect/singleCourse",
        Data
      );
      dispatch(getResultPayMent(data.success));
    } catch (error: any) {
      if (error.response.status == 404) {
        throw new Error("Invalid redirect");
      }
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};
