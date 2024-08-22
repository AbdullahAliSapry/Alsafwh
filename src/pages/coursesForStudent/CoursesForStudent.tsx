import { Box, Container, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./CoursesForStudent.module.css";
import { IconSchool } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect, useState } from "react";
import { GetCoursesToStudentApi } from "@store/api/StudentApi";
import { toast } from "react-toastify";
import CourseCardStudent from "./coursecardstudent/CourseCardStudent";
import PaginationCom from "@shared/Pagination/PaginationCom";
import StudentHeader from "@pages/studentPage/StudentHeader";
import { useTranslation } from "react-i18next";

const color = "rgb(34,166,241)";

export default function CoursesForStudent() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();

  const { studentCourses, student } = useSelector(
    (state: RootState) => state.Student
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { id } = useParams();
  useEffect(() => {
    if (id != student?.user.id) {
      toast.error(t("coursesForStudent.userNotFound"));
      return;
    }
    if (id !== null && id) {
      dispatch(GetCoursesToStudentApi(id));
    }
  }, [id, dispatch, student, t]);

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = studentCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <Box
      mb={100}
      className={classes.parent}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <StudentHeader num={1} />
      <Container
        px={50}
        py={20}
        mt={80}
        className={
          computedColorScheme == "light"
            ? classes.containerLight
            : classes.containerDark
        }>
        <Box>
          <Box
            display={"grid"}
            style={{
              gap: "2rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}>
            <Box display={"flex"} style={{ alignItems: "center", gap: "1rem" }}>
              <Box className={classes.containerImage} h={100} w={100}>
                <img src={student?.user.fileUploads.url} alt="" />
              </Box>
              <Box>
                <Text fw={700} fz={18} c={color}>
                  {student?.user.firstName + " " + student?.user.lastName}
                </Text>
                <Text fz={15} fw={400} mt={8}>
                  {student?.user.gender === "male"
                    ? t("coursesForStudent.maleStudent")
                    : t("coursesForStudent.femaleStudent")}
                </Text>
              </Box>
            </Box>
            <Box
              className={classes.numberOfCourses}
              display={"flex"}
              style={{ alignItems: "center" }}>
              <IconSchool
                style={{
                  marginLeft: "7px",
                  width: "30px",
                  height: "30px",
                  color: color,
                }}
                stroke={1.5}
              />
              <Text fz={17}>{t("coursesForStudent.registeredCourses")} :</Text>
              <Text mr={10} fz={25} fw={700} c={color}>
                {studentCourses.length}
              </Text>
            </Box>
          </Box>
        </Box>
        {studentCourses.length > 0 ? (
          <>
            {currentCourses.map((course) => (
              <CourseCardStudent key={course.id} course={course} />
            ))}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <h1>{t("coursesForStudent.noCourses")}</h1>
          </div>
        )}

        {studentCourses.length > 0 && (
          <Box
            display={"flex"}
            style={{ justifyContent: "center" }}
            mt={50}
            mb={10}>
            <PaginationCom
              length={studentCourses.length}
              SetPage={setCurrentPage}
              page={currentPage}
              Take={itemsPerPage}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
