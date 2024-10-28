import HeaderTeacher from "@pages/teacherpage/components/headerteacher/HeaderTeacher";
import Styles from "./LessonDetailsTeacher.module.css";
import imageSubject from "@assets/Alsafwa/teacheravatart.png";
import HeaderLesson from "@shared/HeaderLesson/HeaderLesson";
import AllLessons from "./components/alllessons/AllLessons";
import { Box, useComputedColorScheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetLessonsCourseApi } from "@store/api/LessionApi";
import { GetTeacherCoursesApi } from "@store/api/TeacherApi";

export default function LessonDetailsTeacher() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { Courses, teacher } = useSelector((state: RootState) => state.Teacher);
  const { AllLessonsCourse } = useSelector((state: RootState) => state.Lesson);
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const { id } = useParams();

  const course = Courses.find((c) => c.id === id);

  useEffect(() => {
    if (!id) return;
    dispatch(GetLessonsCourseApi(id));
  }, []);

  useEffect(() => {
    if ( !AuthModel?.userId) return;
    dispatch(GetTeacherCoursesApi(AuthModel.userId));
  }, [AuthModel?.userId, dispatch]);
  
  return (
    <Box
      bg={computedColorScheme == "light" ? "" : "rgb(36,36,36)"}
      className={Styles.parent}>
      <div className={Styles.header}>
        <HeaderTeacher
          publicId={teacher?.user.fileUploads.publicId || ""}
          userId={teacher?.user.id || ""}
          image={teacher?.user.fileUploads.url || ""}
          name={teacher?.user.firstName + " " + teacher?.user.lastName}
          subject={course?.subject?.name || ""}
        />{" "}
        <HeaderLesson
          img={imageSubject}
          name={course?.subject?.name || ""}
          title={course?.subject?.description || ""}
        />
      </div>
      {AllLessonsCourse.length > 0 ? (
        <>
          <div className={Styles.bodyLesson}>
            <AllLessons lessons={AllLessonsCourse} />
          </div>
        </>
      ) : (
        <h1 className="NotFoundStyle" style={{textAlign:"center"}}>لم يتم اضافه اي دروس لهذا الكورس</h1>
      )}
    </Box>
  );
}
