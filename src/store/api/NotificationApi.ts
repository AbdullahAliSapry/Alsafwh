/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllNotifications,
  makeReading,
  removeNotification,
} from "@store/slices/NotificationSlice";
import { Api } from "@utilities/Api";
import { INotification } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const GetAllNotificationsApi = (userId: string) => {
  return async (dispatch: Dispatch<PayloadAction<INotification[]>>) => {
    try {
      const { data } = await Api.get(`Notification/getAllToUser/${userId}`);
      dispatch(getAllNotifications(data));
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};

export const MakeReadingApi = (notificationId: string) => {
  return async (dispatch: Dispatch<PayloadAction<INotification>>) => {
    try {
      const { data } = await Api.get(
        `Notification/makeIsReading/${notificationId}`
      );
      dispatch(makeReading(data));
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};

export const DeleteNotificationApi = (notificationId: string) => {
  return async (dispatch: Dispatch<PayloadAction<string>>) => {
    try {
      await Api.delete(`Notification/delete/${notificationId}`);
      dispatch(removeNotification(notificationId));
      toast.success("تم حذف التنبيه بنجاح");
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};
