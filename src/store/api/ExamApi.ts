/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { addExam, GetExamToLesson, submitExam } from "@store/slices/ExamSlice";
import { editOnExamPublished } from "@store/slices/LessonSlice";
import { Api } from "@utilities/Api";
import {
  IExam,
  IExamAttemp,
  IQuizSubmit,
} from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const AddExamApi = (Exam: Omit<IExam, "id" | "isPubliched">) => {
  return async (dispatch: Dispatch<PayloadAction<boolean | IExam>>) => {
    try {
      const { data } = await Api.post("Quize/addQuize", {
        ...Exam,
        quizeTime: Exam.quizeTime.toString(),
      });
      console.log(data);
      dispatch(addExam(true));
      dispatch(GetExamToLesson(data.quize));
      toast.success("تمت أضافة الامتحان بنجاح");
    } catch (error: any) {
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "حدث خطأ اثناء التحميل");
    }
  };
};

export const GetExamToLessonApi = (lessonId: string) => {
  return async (dispatch: Dispatch<PayloadAction<IExam>>) => {
    try {
      const { data } = await Api.get(`Quize/getQuize/${lessonId}`);
      dispatch(GetExamToLesson(data));
    } catch (error: any) {
      console.log(error.response);
      toast.error(error?.response?.data?.message || "حدث خطأ ا��نا�� التحميل");
    }
  };
};

export const MakePublishedApi = (quizeId: string) => {
  return async (dispatch: Dispatch<PayloadAction<string>>) => {
    try {
      await Api.patch(`Quize/makepublish/${quizeId}`);
      dispatch(editOnExamPublished(quizeId));
      toast.success("تم نشر الامتحان بنجاح");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "حدث خطأ ا��نا�� التحميل");
    }
  };
};

export const SendExamToStudent = (
  Data: IQuizSubmit[],
  examId: string,
  studentId: number
) => {
  return async (dispatch: Dispatch<PayloadAction<IExamAttemp | null>>) => {
    try {
      const { data } = await Api.post(
        `StudentAnswer/addstudentanswer/${examId}/${studentId}`,
        Data
      );
      console.log(data);

      dispatch(submitExam(data.attemp));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "حدث خطأ ا��نا�� التحميل");
    }
  };
};

export const CheckExaminedApi = (examId: string, studentId: number) => {
  return async (dispatch: Dispatch<PayloadAction<IExamAttemp | null>>) => {
    try {
      const { data } = await Api.get(
        `StudentAnswer/check/${examId}/${studentId}`
      );
      dispatch(submitExam(data.re));
    } catch (error: any) {
      console.log(error);
    }
  };
};
