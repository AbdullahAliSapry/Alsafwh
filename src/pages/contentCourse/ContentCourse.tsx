import { Box, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./ContentCourse.module.css";
import { IconCheck, IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetLessonsStudentApi } from "@store/api/LessionApi";
import Lesson from "./lesson/Lesson";
import Stars from "@shared/Stars/Stars";
import { GetSingleCourse } from "@store/api/CourseApi";

export default function ContentCourse() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { CourseId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { Lessons } = useSelector((state: RootState) => state.Lesson);
  const { course, rateToCourse } = useSelector(
    (state: RootState) => state.Course
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (CourseId) {
      dispatch(GetLessonsStudentApi(CourseId));
      dispatch(GetSingleCourse(CourseId));
    }
  }, [CourseId, dispatch]);

  const activeLesson = new URLSearchParams(location.search);
  const initialLesson = parseInt(activeLesson.get("Lesson") || "1", 10);
  const [active, setActive] = useState<number>(initialLesson);

  useEffect(() => {
    if (Lessons.length > 0 && initialLesson > Lessons.length) {
      setActive(Lessons.length);
    } else if (Lessons.length > 0) {
      setActive(initialLesson);
    }
  }, [Lessons.length, initialLesson]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("Lesson", String(active));
    navigate({ search: searchParams.toString() });
  }, [active, navigate]);

  if (Lessons.length === 0)
    return <h1 className={classes.StyleNotFound2}>لا يوجد محتوي</h1>;

  const doors = Lessons.map((lesson, i) => ({
    index: i + 1,
    component: <Lesson lesson={lesson} index={i + 1} length={Lessons.length} />,
    title: lesson?.title,
    icon: <IconCheck stroke={1.5} color="#939393" />,
  }));

  const comp = doors[active - 1].component;
  const door = doors.map((item, index) => (
    <Box
      key={item.index}
      data-active={index + 1 === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.index);
      }}
      my={20}
      className={classes.container}>
      <Text
        style={{ border: "2px solid", borderRadius: "50px" }}
        py={1}
        px={10}>
        {item.index}
      </Text>
      <Text fw={500} fz={15}>
        {item.title}
      </Text>
      <Box>
        <Box c={""}>{item.icon}</Box>
      </Box>
      <IconChevronLeft stroke={1.5} color="#939393" />
    </Box>
  ));

  return (
    <Box className={classes.parent}>
      {Lessons.length ? (
        <>
          <Box
            px={20}
            pt={20}
            pb={50}
            className={
              computedColorScheme === "light"
                ? classes.bgLessonLight
                : classes.bgLessonDark
            }
            display={"grid"}
            style={{
              borderLeft: "1px solid rgba(0, 0, 0, 0.3)",
              alignContent: "space-between",
            }}>
            <Box
              style={{ alignContent: "space-between" }}
              className={classes.containerLesson}>
              <Box>
                <Text mb={50} ta={"center"} fz={20} fw={700}>
                  مادة التاريخ
                </Text>
                {door}
              </Box>
            </Box>
            <Box ta={"center"}>
              <Text c={"gold"} fw={700} fz={50}>
                {rateToCourse > 0 ? rateToCourse : <>لا يوجد تقييم</>}
              </Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}>
                <Stars num={rateToCourse} />
              </div>
              <Link
                to={`/feedback-course/${CourseId}`}
                className={classes.evaluationBtn}>
                لتقييم الكورس
              </Link>
            </Box>
          </Box>
          <Box>{comp}</Box>
        </>
      ) : (
        <>
          <h1>لا يوجد محتوي</h1>
        </>
      )}
    </Box>
  );
}
