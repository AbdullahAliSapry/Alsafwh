import { Box, Text } from "@mantine/core";
import classes from "./Announcement.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Announcement() {
  const { t } = useTranslation();

  return (
    <Box my={100} mx={0} style={{ display: "flex", justifyContent: "center" }}>
      <Box mx={0} className={classes.containerUp}>
        <Box c={"white"} className={classes.popup}>
          <Text fz={30} mb={30}>
            {t("Announcement.titlePart1")}{" "}
            <span style={{ color: "#003EDD" }}>
              {t("Announcement.titlePart2")}
            </span>
            , {t("Announcement.titlePart3")}
          </Text>
          <Text fz={15} fw={400} mb={40}>
            {t("Announcement.subtitle")}
          </Text>
          <Link to={"/"} className={classes.btnSubscribe}>
            {t("Announcement.subscribeButton")}
          </Link>
          <Text mt={40} mb={30} fz={16}>
            {t("Announcement.offersTextPart1")}{" "}
            <span style={{ color: "#003EDD" }}>
              {t("Announcement.offersTextPart2")}
            </span>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

