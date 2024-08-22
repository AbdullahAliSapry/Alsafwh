import { Notification, rem } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { INotification } from "@utilities/interfaces/PublicInterfce";
import classes from "./Messages.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import {
  DeleteNotificationApi,
  MakeReadingApi,
} from "@store/api/NotificationApi";
export default function NotificationCom({
  notification,
}: {
  notification: INotification;
}) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const dispatch = useDispatch<AppDispatch>();

  const handleReading = () => {
    dispatch(MakeReadingApi(notification.id));
  };
  const handleDeleted = () => {
    dispatch(DeleteNotificationApi(notification.id));
  };
  return (
    <Notification
      icon={notification.isReading ? checkIcon : xIcon}
      withBorder
      onClose={handleDeleted}
      color={notification.isReading ? "rgb(34,139,230)" : "red"}
      title={notification.title}>
      <div className={classes.parentNot}>
        <div>
          {notification.body}
          {notification.isReading ? (
            ""
          ) : (
            <button onClick={handleReading} className={classes.btnReading}>
              قراءه
            </button>
          )}
        </div>
        <br />
        <span style={{ fontSize: "12px", color: "#999" }}>
          {new Date(notification.sending.toLocaleString()).toDateString()}
        </span>
      </div>
    </Notification>
  );
}
