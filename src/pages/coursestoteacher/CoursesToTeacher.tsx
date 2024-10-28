import { Box, Text } from "@mantine/core";
import classes from "./CoursesToTeacher.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetTeacherCoursesApi } from "@store/api/TeacherApi";
import { useParams } from "react-router-dom";
import CourseCard from "@pages/allcourses/components/coursecard/CourseCard";

export default function CoursesToTeacher() {
  const { Courses } = useSelector((state: RootState) => state.Teacher);

  const dispatch = useDispatch<AppDispatch>();

  const { teacherId, teacherName } = useParams();

  useEffect(() => {
    if (teacherId !== undefined && teacherId.length === 0) return;
    dispatch(GetTeacherCoursesApi(teacherId || ""));
  }, [dispatch, teacherId]);
  console.log(teacherName);

  return (
    <div>
      {" "}
      <Box className={classes.headerPageTeacher}>
        <Text my={20} fz={30} c={"#003EDD"}>
          المعليمن{" "}
        </Text>

        <Text my={20} className={classes.Description}>
          هم صناع الاجيال و بناة المستقبل
        </Text>
      </Box>
      <Box mb={50}>
        <Text my={20} fz={20} c={"#003EDD"}></Text>
      </Box>
      <Box>
        <Text my={50} fw={700} fz={20} c={"blue"} className={classes.nameStyle}>
          الكورسات المتاحه ل {teacherName}
        </Text>
      </Box>
      <Box className={classes.styleAllCard}>
        {Courses.length > 0 && (
          <>
            {Courses.map((course) => (
              <>
                <CourseCard course={course} key={course.id} />
              </>
            ))}
          </>
        )}
        {Courses.length === 0 && <h1 className="NotFoundStyle"> لا يوجد اي كورسات</h1>}
      </Box>
    </div>
  );
}
