import { Box, Container, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./TeaxherSetting.module.css";
import image from "@assets/Alsafwa/RetratoTwo.png";
import {
  IconMailFilled,
  IconPhoneFilled,
  IconSchool,
  IconUserFilled,
} from "@tabler/icons-react";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTeacher from "../headerteacher/HeaderTeacher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetTeacherApi, GetTeacherCoursesApi } from "@store/api/TeacherApi";
import ChangePasswordCom from "@pages/studentPage/ChangePasswordCom";
const color = "rgb(34,166,241)";

export default function TeacherSetting() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { teacher, Courses } = useSelector((state: RootState) => state.Teacher);
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    dispatch(GetTeacherApi(id));
  }, []);

  useEffect(() => {
    if (Courses.length === 0) {
      dispatch(GetTeacherCoursesApi(teacher?.user?.id || ""));
    }
  }, [Courses.length, dispatch, teacher?.user?.id]);

  useEffect(() => {
    if (AuthModel?.userId !== teacher?.user?.id && teacher?.user?.id !== id) {
      navigate("/");
    }
  }, [AuthModel?.userId, id, navigate, teacher?.user?.id]);

  return (
    <Box mb={100} className={classes.parent}>
      {teacher ? (
        <>
          {" "}
          <Container
            px={50}
            py={20}
            className={
              computedColorScheme == "light"
                ? classes.containerLight
                : classes.containerDark
            }>
            <div>
              <Box
                display={"flex"}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}>
                <HeaderTeacher
                  publicId={teacher?.user?.fileUploads.publicId || ""}
                  userId={teacher?.user?.id || ""}
                  image={teacher?.user?.fileUploads.url || image}
                  name={teacher?.user.firstName + " " + teacher?.user.lastName}
                  subject={
                    Courses?.[0]?.subject?.name || "لم يتم اضاافه اي كورسات"
                  }
                />
                <Box
                  className={classes.numberOfCourses}
                  display={"flex"}
                  style={{ alignItems: "center" }}>
                  <IconSchool
                    style={{
                      marginLeft: "7px",
                      width: "30px",
                      height: "30px",
                      color: "white",
                    }}
                    stroke={1.5}
                  />
                  <Link
                    to={`/teacher-courses/${teacher?.user.id}`}
                    className={classes.LinkCourses}>
                    الكورسات المقدمه
                  </Link>
                  <Text mr={10}>{Courses.length}</Text>
                </Box>
              </Box>
              <Box>
                <div className={classes.descriptionStyle}>
                  <h5>نبذه مختصره عن المعلم: </h5>
                  <p className={classes.description}>{teacher?.description}</p>
                </div>
                <div className={classes.descriptionStyle}>
                  <h5>نبذة عن سنوات الخبره : </h5>
                  <p className={classes.description}>
                    {teacher?.yearsofExperience}
                  </p>
                </div>
              </Box>
            </div>

            <Box
              display={"flex"}
              mt={50}
              style={{ gap: "2rem" }}
              className={classes.containerFiled}>
              <Box w={"100%"}>
                <Box display={"flex"}>
                  <IconUserFilled
                    style={{
                      color: color,
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                    }}
                  />
                  <label htmlFor="firstName" style={{ fontSize: "15px" }}>
                    الأسم الأول
                  </label>
                </Box>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  readOnly
                  value={teacher?.user.firstName}
                  placeholder="اسمك الاول"
                  className={classes.inputFiled}
                />
              </Box>

              <Box w={"100%"}>
                <Box display={"flex"}>
                  <IconUserFilled
                    style={{
                      color: color,
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                    }}
                  />
                  <label htmlFor="secondName" style={{ fontSize: "15px" }}>
                    الأسم الثاني
                  </label>
                </Box>
                <input
                  type="text"
                  id="secondName"
                  name="secondName"
                  value={teacher?.user.lastName}
                  readOnly
                  placeholder="اسمك الثاني"
                  className={classes.inputFiled}
                />
              </Box>
            </Box>
            <ChangePasswordCom />

            <Box
              display={"flex"}
              mt={50}
              className={classes.containerStudentDate}
              style={{ justifyContent: "space-between" }}>
              <Box>
                <Box>
                  <Box display={"flex"} style={{ alignItems: "center" }}>
                    <IconMailFilled
                      style={{
                        height: "15px",
                        width: "15px",
                        color: color,
                        marginLeft: "5px",
                      }}
                    />
                    <Text>البريد الالكترونى </Text>
                  </Box>

                  <Box
                    mt={20}
                    display={"flex"}
                    className={classes.emailStyle}
                    style={{ alignItems: "center" }}>
                    <Text>{teacher?.user.email}</Text>
                    <RiEdit2Fill color="#4182F9" />
                  </Box>
                </Box>
              </Box>

              <Box ml={50}>
                <Box>
                  <Box display={"flex"} style={{ alignItems: "center" }}>
                    <IconPhoneFilled
                      style={{
                        height: "15px",
                        width: "15px",
                        color: color,
                        marginLeft: "5px",
                      }}
                    />
                    <Text>رقم الهاتف </Text>
                  </Box>

                  <Box
                    mt={20}
                    display={"flex"}
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}>
                    <Text>{teacher?.user.phone}</Text>
                    <RiEdit2Fill color="#4182F9" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <>لا يوجد اي بينات لهذا المدرس</>
      )}
    </Box>
  );
}
