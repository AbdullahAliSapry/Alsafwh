import { Box, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./../ContentCourse.module.css";
import image from "@assets/Alsafwa/RetratoTwo.png";
import examImage from "@assets/exambg.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetExamToLessonApi } from "@store/api/ExamApi";

export default function ExamLession() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();

  const { exam } = useSelector((state: RootState) => state.Exam);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    dispatch(GetExamToLessonApi(id));
  }, []);
  return (
    <div>
      {" "}
      {exam ? (
        <>
          {" "}
          <Box
            className={
              computedColorScheme == "light"
                ? classes.colorComponentLight
                : classes.colorComponentDark
            }
            py={15}>
            <Box>
              <Text fz={25} fw={700} mt={0} ml={0} mb={25}>
                {exam?.title}
              </Text>
            </Box>
            <Box
              mb={10}
              display={"flex"}
              style={{ justifyContent: "space-between" }}>
              <Box display={"flex"} style={{ gap: "0.5rem" }}></Box>

              <Box ml={10}>الفصل 1/4</Box>
            </Box>

            <Box mb={20}>
              <Box>
                <Box
                  display={"flex"}
                  style={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}>
                  <Text c={"rgba(34, 166, 241, 1)"} fw={700} fz={20}>
                    عدد الأسئلة : {exam?.numberQustion} اسئلة
                  </Text>
                  <Text c={"rgba(34, 166, 241, 1)"} fw={700} fz={20}>
                    وقت الأمتحان : {exam?.quizeTime} دقيقة{" "}
                  </Text>
                </Box>
                <Box className={classes.containerImage}>
                  <img
                    className={classes.imageSize}
                    src={examImage}
                    alt=""
                    width={"350px"}
                    height={"350px"}
                  />
                  <Link
                    className={classes.startExam}
                    to={`/exam-page/${exam?.lessionID}`}>
                    ابدأ الامتحان
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box mt={50} mb={20} className={classes.containerTabs}>
              <Box>
                {" "}
                <Box>
                  <Text mb={30} c={"rgba(34, 166, 241, 1)"} fz={20} fw={700}>
                    وصف الامتحان
                  </Text>
                  <Text>{exam?.description}</Text>
                </Box>
              </Box>
              <Box
                mt={30}
                px={20}
                pt={15}
                pb={15}
                bg={"rgba(34, 166, 241, 0.1)"}
                style={{ borderRadius: "10px" }}
                className={classes.teacherData}>
                <Text ta={"center"} mb={10} fz={15} fw={700}>
                  عن المعلم
                </Text>
                <Box
                  display={"flex"}
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <Box
                    mt={5}
                    className={classes.containerImageEmail}
                    h={70}
                    w={70}>
                    <img src={image} width={"150px"} height={"100%"} alt="" />
                  </Box>
                  <Box mr={10}>
                    <Text
                      fz={14}
                      ta={"center"}
                      fw={700}
                      c={"rgba(34, 166, 241, 1)"}>
                      أحمد كامل
                    </Text>
                    <Text fz={13} ta={"center"} fw={700}>
                      معلم مادة التاريخ{" "}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box py={15}>
            <Text fz={20} fw={700} ta={"center"}>
              لا توجد اي امتحنات متوفره حاليا
            </Text>
          </Box>
        </>
      )}
    </div>
  );
}
