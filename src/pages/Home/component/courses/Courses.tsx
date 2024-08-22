import { GetAllCoursesApi } from "@store/api/CourseApi";
import { AppDispatch, RootState } from "@store/Store";
import {
  classes,
  Box,
  Container,
  Text,
  IconUser,
  Button,
} from "@utilities/imports/ImportsCoursesSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Courses() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.Course);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(GetAllCoursesApi(1, 4));
  }, [dispatch]);

  return (
    <>
      <Box ml={20} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Text mt={150} fz={30} fw={700} mr={50} mb={70}>
          <span
            style={{ color: "#003EDD", fontSize: "35px", fontWeight: "bold" }}>
            {t("Courses.title")}
          </span>
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
            {courses?.length > 0 ? (
              <>
                {courses.slice(0, 4).map((course) => (
                  <Box className={classes.styleCard} key={course.id}>
                    <Box className={classes.positionImage}>
                      <Box
                        style={{ display: "grid", justifyContent: "center" }}>
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
                        src={course.teacher.user.fileUploads.url}
                        className={classes.position_Image}
                        alt={course.teacher.user.firstName}
                      />
                    </Box>

                    <Box pt={0}>
                      <Text mb={8} mt={3} fw={700} fz={18}>
                        {course.subject?.name} ({course?.year.name})
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
                      <Box>
                        <button className={classes.StyleBtnFeed}>
                          <Link to={`/feedback-course/${course?.id}`}>رؤيه الاراء</Link>
                        </button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <Text>{t("Courses.noData")}</Text>
            )}
          </Box>
        </Container>
      </Box>
      <Button text={t("Courses.allCoursesButton")} route="/all-courses" />
    </>
  );
}
