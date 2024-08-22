/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAuthToken, getResultPayMent } from "@store/slices/PayMentSlice";
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
      console.log(data);

      dispatch(getAuthToken(data.paymentToken));
    } catch (error: any) {
      console.log(error.response.data.message);

      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const HandlerPayMent = (Data: IPayMentHandlerData) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {

      
      const { data } = await Api.post("Payment/handle-redirect", Data);
      console.log(data);

      dispatch(getResultPayMent(data.success));
    } catch (error: any) {
      console.log(error.response);
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};
