import classes from "./NewCourses.module.css";
import { Box, Text } from "@mantine/core";
// import { IconUser } from "@tabler/icons-react";
import Button from "@shared/Button/Button";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import CourseCard from "@pages/allcourses/components/coursecard/CourseCard";

export default function NewCourses({ courses }: { courses: ICourse[] }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Box mb={50} ml={20} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Text className={classes.StyleTitlePar}>
          {t("NewCourses.title")} <span>{t("NewCourses.courses")}</span>{" "}
          {t("NewCourses.addition")}
        </Text>
      </Box>

      <Box
        mb={100}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <Box className={classes.styleAllCard}>
          {courses.map((course: ICourse) => {
            return <CourseCard course={course} key={course.id} />;
          })}
        </Box>
      </Box>
      <Button route="/all-courses" text={t("NewCourses.allCourses")} />
    </>
  );
}
