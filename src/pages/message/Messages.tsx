import { Box, Container, Text } from "@mantine/core";
import NotificationCom from "./NotificationCom";
import { motion } from "framer-motion";
import classes from "./Messages.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetAllNotificationsApi } from "@store/api/NotificationApi";
import { useTranslation } from "react-i18next";

export default function Messages() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { notifications } = useSelector(
    (state: RootState) => state.Notification
  );
  //handling from params
  const { student } = useSelector((state: RootState) => state.Student);

  useEffect(() => {
    if (!student) return;
    dispatch(GetAllNotificationsApi(student.user.id));
  }, [student, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Container className={classes.parent}>
        {notifications.map((notification) => (
          <NotificationCom key={notification.id} notification={notification} />
        ))}
        {notifications.length === 0 && (
          <Box style={{ textAlign: "center" }} mb={5}>
            <Text fz={28} c={"gray"}>
              {t("notifications.noNotifications")}
            </Text>
          </Box>
        )}
      </Container>
    </motion.div>
  );
}
