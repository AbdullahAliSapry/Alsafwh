import { useEffect } from "react";
import ReactPlayer from "react-player";
import classes from "./SingleCourse.module.css";
import { Box, Text, useComputedColorScheme } from "@mantine/core";
import { IconClock, IconPointFilled } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetSingleCourse } from "@store/api/CourseApi";
import Spinner from "@shared/spineer/Spinner";
export default function SingleCourse() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { course } = useSelector((state: RootState) => state.Course);
  useEffect(() => {
    if (id == null || id == "") return;
    dispatch(GetSingleCourse(id));
  }, [dispatch, id]);

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  console.log(course?.description.includes(","));

  return (
    <>
      {course ? (
        <>
          {" "}
          <Box
            c={computedColorScheme == "light" ? "black" : "white"}
            className={classes.parent}>
            <Box className={classes.headerPage}>
              <Text mb={20} fz={30} c={"white"}>
                {course?.subject?.name}
                <span style={{ color: "#003EDD", fontSize: "15px" }}>
                  {" "}
                  <span style={{ color: "white" }}>( </span> فلسفة فكر بعمق{" "}
                  <span style={{ color: "white" }}>) </span>
                </span>
              </Text>

              <Text mb={20} c={"white"}>
                {course?.subject?.description}
              </Text>

              <Text mb={20} c={"white"}>
                مقدم الكورس :{" "}
                <span style={{ color: "#003EDD" }}>
                  {course?.teacher.user.firstName +
                    " " +
                    course?.teacher.user.lastName}
                </span>
              </Text>

              <Text mb={20} c={"white"}>
                الشعبة الدراسية :<span style={{ color: "#003EDD" }}>ادبي</span>
              </Text>

              <Text mb={20} c={"white"}>
                الصف الدراسى :{" "}
                <span style={{ color: "#003EDD" }}>{course?.year?.name}</span>
              </Text>
            </Box>

            <Box
              display={"grid"}
              style={{ justifyContent: "center" }}
              mt={50}
              className={classes.parentCards}>
              <Box>
                <Box className={classes.cardDescription}>
                  <Text fz={30} fw={700}>
                    الوصف :
                  </Text>
                  {course?.description.length > 250 &&
                  course.description.includes(",") ? (
                    <>
                      {course?.description.split(",").map((el, i) => {
                        return (
                          <Text key={i} my={20} fz={15}>
                            {el}
                          </Text>
                        );
                      })}
                    </>
                  ) : (
                    course?.description
                  )}
                </Box>

                <Box className={classes.cardDescription}>
                  <Text fz={30} fw={700}>
                    ماذا ستتعلم من هذا الكورس :{" "}
                  </Text>

                  <ul style={{ paddingRight: "20px" }}>
                    {course?.learningOutcomes?.length > 250 &&
                    course.learningOutcomes.includes(",") ? (
                      <>
                        {course?.learningOutcomes.split(",").map((el, i) => {
                          return (
                            <li key={i}>
                              <Text my={20} fz={13}>
                                {" "}
                                {el}
                              </Text>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      course?.learningOutcomes
                    )}
                  </ul>
                </Box>
                <Box className={classes.cardDescription}>
                  <Text fz={25} fw={700} c={"#003EDD"}>
                    مُقدم الكورس{" "}
                  </Text>

                  <Box
                    mt={10}
                    display={"flex"}
                    style={{ alignItems: "center", gap: "1rem" }}>
                    <Box
                      style={{
                        borderRadius: "150px",
                        overflow: "hidden",
                        backgroundColor: "black",
                        width: "110px",
                        display: "flex",
                        height: "110px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <img
                        src={course?.teacher.user.fileUploads.url}
                        width={"150px"}
                        style={{ objectFit: "contain" }}
                        height={"100px"}
                        alt=""
                      />
                    </Box>

                    <Box>
                      <Text>
                        {course?.teacher.user.firstName +
                          " " +
                          course?.teacher.user.lastName}
                      </Text>
                    </Box>
                  </Box>

                  <Text my={20} fz={13} fw={500}>
                    {course.teacher.user.gender !== "male" ? "معلمة" : "معلم"}{" "}
                    مادة {course?.subject?.name}
                  </Text>
                  <Text mb={20} fz={13} fw={500}>
                    {course.teacher.description}
                  </Text>

                  <Text mb={20} fz={13} fw={500}>
                    {course.teacher.yearsofExperience}
                  </Text>
                </Box>
              </Box>

              <Box className={classes.container}>
                <Box
                  className={classes.cardVedio}
                  style={{ height: "fit-content" }}>
                  <Box>
                    <ReactPlayer
                      url={course?.trailerVideo}
                      width={"auto"}
                      height={"250px"}
                      controls
                    />
                  </Box>
                  <Box px={20}>
                    <Box
                      mt={10}
                      display={"flex"}
                      style={{
                        alignItems: "center",
                        gap: "1rem",
                        justifyContent: "space-between",
                      }}>
                      <Box
                        style={{
                          borderRadius: "150px",
                          overflow: "hidden",
                          backgroundColor: "black",
                          width: "70px",
                          height: "70px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          objectFit: "contain",
                        }}>
                        <img
                          src={course?.teacher.user.fileUploads.url}
                          width={"100px"}
                          height={"70px"}
                          alt=""
                        />
                      </Box>

                      <Box>
                        <Text>{course?.title}</Text>
                        <Text ta={"center"} fz={13} fw={300}>
                          {course?.year?.name}
                        </Text>
                      </Box>
                    </Box>
                    <Box mt={10}>
                      <Text>
                        {course?.teacher.user.firstName +
                          " " +
                          course?.teacher.user.lastName}
                      </Text>
                      <Text fz={13} fw={300}>
                        {course.teacher.user.gender !== "male"
                          ? "معلمة"
                          : "معلم"}{" "}
                        مادة {course?.subject?.name}{" "}
                      </Text>
                    </Box>
                    <Text mt={10} fz={13}>
                      {course.teacher.description}
                    </Text>
                    <Box
                      pl={10}
                      pt={5}
                      my={10}
                      pb={10}
                      display={"flex"}
                      style={{ justifyContent: "space-between" }}>
                      <Box
                        display={"flex"}
                        style={{
                          color: "rgb(37,202,133)",
                          alignItems: "start",
                        }}>
                        <IconPointFilled
                          stroke={2.0}
                          style={{ width: "25px", height: "27px" }}
                        />

                        <Text fz={14}>مدة الكورس</Text>
                      </Box>

                      <Box display={"flex"} style={{ alignItems: "center" }}>
                        <IconClock stroke={1.2} style={{ marginLeft: "5px" }} />
                        <Text fz={14} fw={500}>
                          <Text fz={14}>غير محسوبه</Text>
                        </Text>
                      </Box>
                    </Box>

                    <Box
                      display={"flex"}
                      style={{ justifyContent: "center", gap: "10px" }}>
                      <Link to={"/"} className={classes.btnSub}>
                        تسجيل
                      </Link>
                      <Link
                        to={`/feedback-course/${course.id}`}
                        className={classes.btnSub}>
                        الاراء عن هذا الكورس
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <h1>لا يوحد محتوي لهذا الكورس</h1>
          <Spinner />
        </>
      )}
    </>
  );
}

// display={"grid"} style={{justifyContent:"center"}}
