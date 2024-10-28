/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { addProblem } from "@store/slices/ProblemSlice";
import { Api } from "@utilities/Api";
import { IProblem } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const SendProblemApi = (Data: IProblem) => {
  return async (
    dispatch: Dispatch<PayloadAction<{ loading: boolean; added: boolean }>>
  ) => {
    try {
      dispatch(addProblem({ loading: true, added: false }));
      await Api.post("Problem/sendProblem", Data);
      dispatch(addProblem({ loading: false, added: true }));
      toast.success("تم ارسال المشكلة بنجاح سيتم التواصل معك في اسرع وقت");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء الارسال");
    }
  };
};
