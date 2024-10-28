import { Box, Text } from "@mantine/core";
import classes from "./Status.module.css";
// import { LiaChalkboardTeacherSolid } from "react-icons/lia";
// import { IconCertificate, IconPlus, IconSchool } from "@tabler/icons-react";
import Button from "@shared/Button/Button";
import AllSubjects from "../subjects/AllSubjects";
import { useTranslation } from "react-i18next";

export default function Status() {
  const { t, i18n } = useTranslation();

  return (
    <Box mb={100} className={classes.parent}>
      <Box
        className={classes.statusUp}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Box>
          <Box>
            <Text  fw={700} className={classes.titleStatus}>
              {t("Status.browse")}{" "}
              <span style={{ color: "#003EDD" }}>{t("Status.materials")}</span>
            </Text>
          </Box>

          <Box
            className={classes.titleStatus}
            mt={50}
            display={"flex"}
            style={{ gap: "2rem", flexWrap: "wrap" }}></Box>
          <div className={classes.ButtonNormal}>
            <Button
              route="/all-materials"
              text={t("Status.allMaterialsButton")}
            />
          </div>
        </Box>
        <AllSubjects />
        <div className={classes.ButtonPhone}>
          <Button
            route="/all-materials"
            text={t("Status.allMaterialsButton")}
          />
        </div>
      </Box>
    </Box>
  );
}
