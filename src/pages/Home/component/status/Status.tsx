import { Box, Text } from "@mantine/core";
import classes from "./Status.module.css";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IconCertificate, IconPlus, IconSchool } from "@tabler/icons-react";
import Button from "@shared/Button/Button";
import AllSubjects from "../subjects/AllSubjects";
import { useTranslation } from "react-i18next";

export default function Status() {
  const { t ,i18n} = useTranslation();

  return (
    <Box mb={100} className={classes.parent}>
      <Box
        className={classes.statusUp}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Box>
          <Box>
            <Text fz={30} fw={700} className={classes.titleStatus}>
              {t("Status.browse")}{" "}
              <span style={{ color: "#003EDD" }}>{t("Status.materials")}</span>
            </Text>
          </Box>

          <Box
            className={classes.titleStatus}
            mt={50}
            display={"flex"}
            style={{ gap: "2rem", flexWrap: "wrap" }}>
            <Box display={"flex"} style={{ alignItems: "start" }}>
              <IconSchool
                style={{
                  color: "#003EDD",
                  width: "50px",
                  height: "50px",
                  marginLeft: "10px",
                }}
                stroke={2.0}
              />
              <Box>
                <Text fz={20} fw={700}>
                  {t("Status.registeredStudents")}
                </Text>
                <Text fz={25} fw={700} c={"#003EDD"}>
                  <IconPlus
                    stroke={5.0}
                    style={{ width: "18px", height: "18px" }}
                  />
                  5,000
                </Text>
              </Box>
            </Box>

            <Box display={"flex"} style={{ alignItems: "start" }}>
              <LiaChalkboardTeacherSolid
                style={{
                  color: "#003EDD",
                  width: "50px",
                  height: "50px",
                  marginLeft: "10px",
                }}
              />
              <Box>
                <Text fz={20} fw={700}>
                  {t("Status.expertTeachers")}
                </Text>
                <Text fz={25} fw={700} c={"#003EDD"}>
                  <IconPlus
                    stroke={5.0}
                    style={{ width: "18px", height: "18px" }}
                  />
                  500
                </Text>
              </Box>
            </Box>

            <Box display={"flex"} style={{ alignItems: "start" }}>
              <IconCertificate
                style={{
                  color: "#003EDD",
                  width: "50px",
                  height: "50px",
                  marginLeft: "10px",
                }}
                stroke={2.0}
              />
              <Box>
                <Text fz={20} fw={700}>
                  {t("Status.onlineCourses")}
                </Text>
                <Text fz={25} fw={700} c={"#003EDD"}>
                  <IconPlus
                    stroke={5.0}
                    style={{ width: "18px", height: "18px" }}
                  />
                  1,000
                </Text>
              </Box>
            </Box>
          </Box>

          <Button
            route="/all-materials"
            text={t("Status.allMaterialsButton")}
          />
        </Box>

        <AllSubjects />
      </Box>
    </Box>
  );
}
