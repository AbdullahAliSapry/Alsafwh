import { Box, Container, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./TeaxherSetting.module.css";
import image from "@assets/Alsafwa/RetratoTwo.png";
import {
  IconMailFilled,
  IconPassword,
  IconPhoneFilled,
  IconSchool,
  IconUserFilled,
} from "@tabler/icons-react";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import HeaderTeacher from "../headerteacher/HeaderTeacher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetTeacherApi } from "@store/api/TeacherApi";
const color = "rgb(34,166,241)";

export default function TeacherSetting() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { teacher } = useSelector((state: RootState) => state.Teacher);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(GetTeacherApi(id));
  }, []);
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
                  subject={"ldlld"}
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
                  <Text mr={10}>6</Text>
                </Box>
              </Box>
              <p className={classes.description}>{teacher?.description}</p>
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
                  placeholder="اسمك الثاني"
                  className={classes.inputFiled}
                />
              </Box>
            </Box>

            <Box
              display={"flex"}
              mt={20}
              style={{ gap: "2rem" }}
              className={classes.containerFiled}>
              <Box w={"100%"}>
                <Box display={"flex"} style={{ alignItems: "center" }}>
                  <IconPassword
                    style={{
                      color: color,
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                    }}
                  />
                  <label htmlFor="changePassword" style={{ fontSize: "15px" }}>
                    تغيير كلمة المرور
                  </label>
                </Box>
                <input
                  type="password"
                  id="changePassword"
                  name="changePassword"
                  placeholder="كلمة المرور الجديدة "
                  className={classes.inputFiled}
                />
              </Box>

              <Box w={"100%"}>
                <Box display={"flex"} style={{ alignItems: "center" }}>
                  <IconPassword
                    style={{
                      color: color,
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                    }}
                  />
                  <label htmlFor="confirmChange" style={{ fontSize: "15px" }}>
                    تأكيد تغيير كلمة المرور
                  </label>
                </Box>
                <input
                  type="password"
                  id="confirmChange"
                  name="confirmChange"
                  placeholder="كلمة المرور الجديدة "
                  className={classes.inputFiled}
                />
              </Box>
            </Box>

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
            <Box
              mt={50}
              mb={30}
              ml={30}
              display={"flex"}
              style={{ justifyContent: "space-between" }}>
              <button className={classes.btnSave}>تعديل</button>
              <button className={classes.btnSave}>حفظ</button>
            </Box>
          </Container>
        </>
      ) : (
        <>لا يوجد اي بينات لهذا المدرس</>
      )}
    </Box>
  );
}
