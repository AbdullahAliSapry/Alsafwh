/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAllMonthContent, getAllYear } from "@store/slices/YearSlice";
import { Api } from "@utilities/Api";
import { IMonthContent, IYear } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const GetAllYears = () => {
  return async (dispatch: Dispatch<PayloadAction<IYear[]>>) => {
    try {
      const { data } = await Api.get("Year/getAll");
      dispatch(getAllYear(data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};



export const GetAllMonthsApi = () => {
  return async (dispatch: Dispatch<PayloadAction<IMonthContent[]>>) => {
    try {
      const { data } = await Api.get("ContentMonth/GetAll");
      dispatch(getAllMonthContent(data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};
