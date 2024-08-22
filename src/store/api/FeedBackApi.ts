/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { addFeedback, getFeedbacks } from "@store/slices/FeedBackSlice";
import { Api } from "@utilities/Api";
import { IAddFeedBack } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const AddFeedbackApi = (feedback: IAddFeedBack) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      dispatch(addFeedback({ loading: false, submit: false }));
      const { data } = await Api.post("Feedback/add-feedback", feedback);
      dispatch(addFeedback({ loading: false, submit: true }));
      toast.success("تم اضافه رايك بنجاح");
    } catch (error: any) {
      console.log(error.response);

      toast.error(error.response.data.message || "Error in AddFeedback");
    }
  };
};
export const GetAllFeedbackApi = () => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      dispatch(addFeedback({ loading: false, submit: false }));
      const { data } = await Api.get("Feedback/getAllFeedback");
      dispatch(getFeedbacks(data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in Get Feedbacks");
    }
  };
};
