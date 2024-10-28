import imageCourse from "@assets/Alsafwa/222.jpg";
import { Link } from "react-router-dom";
import {
  Box,
  Divider,
  Slider,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "../CoursesForStudent.module.css";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { useTranslation } from "react-i18next";

const color = "rgb(34,166,241)";

export default function CourseCardStudent({
  course,
  isSingle,
}: {
  course: ICourse;
  isSingle: boolean;
}) {
  const { t } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div>
      <Box mt={30}>
        <Box
          p={20}
          className={classes.courseCard}
          bg={computedColorScheme == "light" ? "" : "rgb(41,41,42)"}>
          <Box h={"fit-content"} w={"100"}>
            <img
              src={course?.imgUrl || imageCourse}
              className={classes.imgCourse}
              alt="course image"
            />
          </Box>

          <Box className={classes.withSlider}>
            <Text className={classes.StyleTitleCard}>{course.title}</Text>
            <Box display={"flex"} style={{ alignItems: "center", gap: "5px" }}>
              <Slider
                defaultValue={0}
                value={course?.studentCourseProgress?.progress}
                disabled
                w={"100%"}
                styles={{
                  bar: { backgroundColor: "rgba(0, 208, 121, 1)" },
                }}
              />
              <Text fz={15} fw={400}>
                {course?.studentCourseProgress?.progress
                  ? course?.studentCourseProgress?.progress
                  : 0}
                %
              </Text>
            </Box>
            <Text fz={15} fw={400}>
              {t("courseCard.totalProgress")}
            </Text>
          </Box>

          <Box display={"flex"}>
            <Divider orientation="vertical" className={classes.divider} />
            <Box className={classes.endContainer}>
              <Text fz={15} fw={700} mb={10}>
                {t("courseCard.next")}
              </Text>
              <Text fw={500} c={color} mb={10}>
                {course?.title}
              </Text>
              <Box mt={15}>
                <Link
                  to={`/content-course/${course.id}?Lesson=1&isSingle=${isSingle}`}
                  className={classes.btnLearn}>
                  {t("courseCard.continueLearning")}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
