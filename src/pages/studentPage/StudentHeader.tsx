import { Box, Text } from "@mantine/core";
import classes from "./StudentPage.module.css";
import { useTranslation } from "react-i18next";

export default function StudentHeader({ num }: { num?: number }) {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Box
        mb={50}
        className={`${classes.headerPageTeacher} ${
          num == 1 ? classes.headerPageTeacherbg : ""
        }`}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <div className={classes.StyleText}>
          <Text my={20} c={"#003EDD"} className={classes.title}>
            {t("student.title")}
          </Text>
          <Text my={20} c={"white"} className={classes.description}>
            {t("student.subtitle")}
          </Text>
        </div>
      </Box>
    </div>
  );
}
