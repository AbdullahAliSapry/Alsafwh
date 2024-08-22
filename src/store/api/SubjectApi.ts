/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAllSubject, getSingleMateriel } from "@store/slices/SubjectSlice";
import { Api } from "@utilities/Api";
import { toast } from "react-toastify";

export const GetAllSubjectApi = () => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get("Subject/getAllSubjects");
      dispatch(getAllSubject(data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in get All Subjects");
    }
  };
};
export const GetSubjectByIdApi = (id: string) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get(`Subject/coursesSubject/${id}`);
      dispatch(getSingleMateriel(data));
    } catch (error: any) {
      toast.error(error.response.data.message || "Error in get All Subjects");
    }
  };
};
