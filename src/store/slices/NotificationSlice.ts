import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "@utilities/interfaces/PublicInterfce";

export interface INotificationState {
  notifications: INotification[];
  numNotReadings: number;
}

const initialState: INotificationState = {
  notifications: [],
  numNotReadings: 0,
};

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    getAllNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
      state.numNotReadings = state.notifications.filter(
        (notification) => notification.isReading === false
      ).length;
    },
    makeReading: (state, action: PayloadAction<INotification>) => {
      const notificationsMap = new Map(
        state.notifications.map((notification) => [
          notification.id,
          notification,
        ])
      );
      const notification = notificationsMap.get(action.payload.id);

      if (notification) {
        notification.isReading = true;
      }
      state.numNotReadings = state.notifications.filter(
        (notification) => notification.isReading === false
      ).length;
    },
  },
});
export const { getAllNotifications, removeNotification, makeReading } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
