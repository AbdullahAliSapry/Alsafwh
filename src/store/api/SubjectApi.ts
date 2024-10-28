/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getAllSubject, getSingleMateriel } from "@store/slices/SubjectSlice";
import { Api } from "@utilities/Api";

export const GetAllSubjectApi = () => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get("Subject/getAllSubjects");
      dispatch(getAllSubject(data));
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};
export const GetSubjectByIdApi = (id: string) => {
  return async (dispatch: Dispatch<PayloadAction<boolean>>) => {
    try {
      const { data } = await Api.get(`Subject/coursesSubject/${id}`);
      dispatch(getSingleMateriel(data));
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};
