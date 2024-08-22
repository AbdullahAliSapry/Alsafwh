import classes from "./NewCourses.module.css";
import { Box, Container, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import Button from "@shared/Button/Button";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { useTranslation } from "react-i18next";

export default function NewCourses({ courses }: { courses: ICourse[] }) {
  const { t, i18n } = useTranslation();

  const getImageClass = (index: number) => {
    const styles = [
      classes.positionImage,
      classes.positionImageFirstGirl,
      classes.positionImageSecondGirl,
      classes.positionImageSecondPersone,
    ];
    return styles[index % styles.length];
  };

  return (
    <>
      <Box mb={50} ml={20} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Text mt={150} fz={30} fw={700} mr={50} mb={70}>
          {t("NewCourses.title")}{" "}
          <span
            style={{ color: "#003EDD", fontSize: "35px", fontWeight: "bold" }}>
            {t("NewCourses.courses")}
          </span>{" "}
          {t("NewCourses.addition")}
        </Text>
      </Box>

      <Box
        mb={100}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Container>
          <Box className={classes.styleAllCard}>
            {courses.map((course: ICourse, index: number) => {
              const imageClass = getImageClass(index);
              return (
                <Box key={course.id} className={classes.styleCard}>
                  <Box className={imageClass}>
                    <Box style={{ display: "grid", justifyContent: "center" }}>
                      <Text pb={-100} pt={30} pr={25} fw={600} fz={20}>
                        {course.title}
                      </Text>
                      <img
                        src={course.imgUrl}
                        className={classes.positionImageOne}
                        alt={course.title}
                      />
                    </Box>
                    <img
                      src={
                        course.teacher?.user.fileUploads?.url ||
                        "default-image-url"
                      }
                      className={classes.position_Image}
                      alt={course.title}
                    />
                  </Box>

                  <Box pt={0}>
                    <Text mb={8} mt={3} fw={700} fz={18}>
                      {course.title}
                    </Text>

                    <Box
                      mt={-8}
                      display={"flex"}
                      style={{ alignItems: "center" }}>
                      <IconUser
                        style={{
                          width: "15px",
                          height: "20px",
                          color: "#828282",
                          marginLeft: "5px",
                        }}
                        stroke={1.5}
                      />
                      <Text fz={17}>
                        {course.teacher?.user.firstName +
                          " " +
                          course.teacher?.user.lastName}
                      </Text>
                    </Box>
                    <Text fz={11} fw={500}>
                      {course.description}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
      <Button route="/all-courses" text={t("NewCourses.allCourses")} />
    </>
  );
}
