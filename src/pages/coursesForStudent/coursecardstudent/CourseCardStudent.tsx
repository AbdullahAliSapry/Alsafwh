import imageCourse from "@assets/Alsafwa/Archaeologist-bro(1).png";
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

export default function CourseCardStudent({ course }: { course: ICourse }) {
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
          <Box bg={"rgba(118, 84, 182, 1)"} h={"fit-content"}>
            <img src={imageCourse} alt="" height={"100px"} width={"100px"} />
          </Box>

          <Box className={classes.withSlider}>
            <Text mb={10} fz={15} fw={400}>
              {course?.subject?.name}
            </Text>
            <Text mb={10} c={color} fw={700} fz={19}>
              {course.title}
            </Text>
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
                  to={`/content-course/${course.id}?Lesson=1`}
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
