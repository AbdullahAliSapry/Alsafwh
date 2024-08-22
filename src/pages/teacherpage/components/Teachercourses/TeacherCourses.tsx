import { Container, useComputedColorScheme } from "@mantine/core";
import Styles from "./TeacherCourses.module.css";
import { motion } from "framer-motion";
import HeaderTeacher from "../headerteacher/HeaderTeacher";
import { IconSchool } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetTeacherCoursesApi } from "@store/api/TeacherApi";
import CourseCardTeacher from "../coursecardteacher/CourseCardTeacher";
const color = "rgb(34,166,241)";

export default function TeacherCourses() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { Courses, teacher } = useSelector((state: RootState) => state.Teacher);
  const { AuthModel } = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    if (!AuthModel?.userId) return;
    dispatch(GetTeacherCoursesApi(AuthModel.userId));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={Styles.parent}>
      <Container
        className={
          computedColorScheme == "light"
            ? Styles.containerLight
            : Styles.containerDark
        }>
        <div className={Styles.headerStyling}>
          <HeaderTeacher
            publicId={teacher?.user.fileUploads.publicId || ""}
            userId={teacher?.user.id || ""}
            image={teacher?.user.fileUploads.url || ""}
            name={teacher?.user.firstName + " " + teacher?.user.lastName}
            subject="فيزياء"
          />
          <div className={Styles.courseHeaderStyle}>
            <IconSchool
              style={{
                marginLeft: "7px",
                width: "30px",
                height: "30px",
                color: color,
              }}
              stroke={1.5}
            />
            <h1>كورساتي</h1>
            <span>{Courses.length}</span>
          </div>
        </div>
        <div className={Styles.bodyStyling}>
          {Courses.map((course) => (
            <CourseCardTeacher key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
