/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { addQuestion } from "@store/slices/QuestionSlice";
import { Api } from "@utilities/Api";
import { IQustion } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const AddQuestionApi = (dataSending: FormData) => {
  return async (
    dispatch: Dispatch<
      PayloadAction<{ question: IQustion | null; Added: boolean }>
    >
  ) => {
    try {
      dispatch(addQuestion({ loading: true, question: null, Added: false }));

      const { data } = await Api.post("Qustion/addQustion", dataSending);
      dispatch(
        addQuestion({ question: data.data, Added: true, loading: false })
      );
      toast.success("تم اضافه السؤال بنجاح");
    } catch (error: any) {
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};
