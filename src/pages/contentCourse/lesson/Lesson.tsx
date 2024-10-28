import { useEffect } from "react";
import { Box, rem, Tabs, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./../ContentCourse.module.css";
import image from "@assets/Alsafwa/RetratoTwo.png";
import { IconMessageCircle } from "@tabler/icons-react";
import Comments from "../comment/Comments";
import { ILesson } from "@utilities/interfaces/PublicInterfce";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import {
  AddWatchApi,
  EditProgressApi,
  MakeCompletedApi,
} from "@store/api/LessionApi";
import { CheckExaminedApi } from "@store/api/ExamApi";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { MdGppBad, MdGppGood } from "react-icons/md";
import { submitExam } from "@store/slices/ExamSlice";

const iconStyle = { width: rem(12), height: rem(12) };

export default function Lesson({
  lesson,
  index,
  length,
}: {
  lesson: ILesson;
  index: number;
  length: number;
}) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch<AppDispatch>();
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const { student } = useSelector((state: RootState) => state.Student);
  const { isAvilable, isCompleted, isLimited, Count } = useSelector(
    (state: RootState) => state.Lesson
  );
  const { examAttemp } = useSelector((state: RootState) => state.Exam);
  const { course } = useSelector((state: RootState) => state.Course);

  useEffect(() => {
    if (!AuthModel?.userId) return;
    dispatch(AddWatchApi(lesson.id, AuthModel?.userId as string));
  }, [lesson.id, AuthModel?.userId, dispatch, isLimited, isAvilable]);

  const makeCompleted = () => {
    if (!student || !lesson) return;
    dispatch(MakeCompletedApi(lesson.id, student.id));
    dispatch(
      EditProgressApi({ courseId: lesson.courseId, studentId: student.id })
    );
  };

  useEffect(() => {
    if (lesson?.quize?.id && student?.id) {
      dispatch(CheckExaminedApi(lesson.quize?.id, student.id));
    }
    else{
      dispatch(submitExam(null));
    }
  }, [dispatch, lesson.quize?.id, student?.id, lesson?.id]);

  return (
    <div>
      <Box
        className={
          computedColorScheme === "light"
            ? classes.colorComponentLight
            : classes.colorComponentDark
        }
        py={15}>
        <Box>
          <Text fz={25} fw={700} mt={0} ml={0} mb={25}>
            {lesson?.title}
          </Text>
        </Box>
        <Box
          mb={10}
          display={"flex"}
          style={{ justifyContent: "space-between" }}>
          <Box display={"flex"} style={{ gap: "0.5rem" }}>
            <Text fz={20} c={"blue"}>
              {index}
            </Text>
            <Text
              fz={18}
              className={
                computedColorScheme === "light"
                  ? classes.titleLight
                  : classes.titleDark
              }>
              {lesson?.title}
            </Text>
          </Box>
          <Box ml={10}>
            الفصل {index}/{length}
          </Box>
        </Box>
        <Box className={classes.ContainerWatching}>
          <h1>عدد المشاهدات المتاح لك </h1>
          <span>{Count}/11</span>
        </Box>
        {isAvilable ? (
          <>
            <Box mb={20}>
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  id="video-player"
                  src={lesson?.videoUrl}
                  loading="lazy"
                  style={{
                    border: "0",
                    position: "absolute",
                    top: "0",
                    height: "70%",
                    width: "80%",
                  }}
                  allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Box>
          </>
        ) : (
          <Box mb={20} ta={"center"}>
            <Text fz={18} c={"red"}>
              هذا الدرس غير متاح حالياً لقد تعديت الحد الاقصي من المشاهدات
            </Text>
          </Box>
        )}
        <Box mt={50} mb={20} className={classes.containerTabs}>
          <Box>
            <Tabs>
              <Tabs.List>
                <Tabs.Tab
                  value="notes"
                  leftSection={<IconMessageCircle style={iconStyle} />}>
                  ملاحظات
                </Tabs.Tab>
                <Tabs.Tab
                  value="messages"
                  leftSection={<IconMessageCircle style={iconStyle} />}>
                  مراجع{" "}
                </Tabs.Tab>
                <Tabs.Tab
                  value="comment"
                  leftSection={<IconMessageCircle style={iconStyle} />}>
                  التعليقات{" "}
                </Tabs.Tab>
                <Tabs.Tab
                  value="exams"
                  leftSection={<IconMessageCircle style={iconStyle} />}>
                  امتحان الدرس{" "}
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel
                className={classes.styleTabsPanel}
                py={15}
                pr={15}
                value="notes">
                {lesson?.description}
              </Tabs.Panel>
              <Tabs.Panel className={classes.styleTabsPanel} value="messages">
                {lesson?.contentPdf ? (
                  <Link
                    to={`${lesson?.contentPdf}`}
                    className={classes.styleLinkPdf}>
                    تحميل pdfs
                  </Link>
                ) : (
                  <h1 className={classes.styleLinkPdf}> لا يوجد اي pdf</h1>
                )}
              </Tabs.Panel>
              <Tabs.Panel className={classes.styleTabsPanel} value="comment">
                <Comments LessonId={lesson.id} />
              </Tabs.Panel>
              <Tabs.Panel className={classes.styleTabsPanel} value="exams">
                {examAttemp ? (
                  <>
                    <Modal.Root
                      opened={opened}
                      onClose={close}
                      zIndex={1000000}>
                      <Modal.Overlay />
                      <Modal.Content>
                        <Modal.Header>
                          <Modal.Title>درجه الامتحان</Modal.Title>
                          <Modal.CloseButton />
                        </Modal.Header>
                        <Modal.Body>
                          <div className={classes.StyleExamGrade}>
                            <Text fz={20}>
                              درجتك هي {examAttemp.score}
                              من {examAttemp.allScore}
                            </Text>
                            {(examAttemp.score / examAttemp.allScore) * 100 >=
                            70 ? (
                              <div className={classes.styleGood}>
                                <MdGppGood />
                                <span>
                                  ما شاء الله تبارك الله يرجي دوام التفوق
                                  والازدهار❤️❤️
                                </span>
                                <span>سيتم ابلاغ ولي الامر بالنتيجه</span>
                              </div>
                            ) : (
                              <div className={classes.styleBad}>
                                <MdGppBad />
                                <span>
                                  صديقي العزيز يرجي العمل علي تحسن درجتك❤️
                                </span>
                                <span>
                                  ان كانت تواجهك اي مشاكل يرجي التواصل مع المعلم
                                  او الدعم الفني
                                </span>
                                <span>سيتم ابلاغ ولي الامر بالنتيجه</span>
                              </div>
                            )}
                          </div>
                        </Modal.Body>
                      </Modal.Content>
                    </Modal.Root>

                    <Button onClick={open}>رؤيه الدرجه</Button>
                  </>
                ) : (
                  <>
                    {lesson.containQuize && lesson.quize?.isPubliched ? (
                      <Button className={classes.btnSend}>
                        <Link to={`/exam-lesson/${lesson.id}`}>
                          الذهاب للامتحان
                        </Link>
                      </Button>
                    ) : (
                      <Button className={classes.btnSend}>
                        لا يوجد امتحان لهذا الدرس
                      </Button>
                    )}
                  </>
                )}
              </Tabs.Panel>
            </Tabs>
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
              <Box mt={5} className={classes.containerImageEmail} h={70} w={70}>
                <img
                  src={course?.teacher.user.fileUploads.url || image}
                  width={"150px"}
                  height={"100%"}
                  alt=""
                />
              </Box>
              <Box mr={10}>
                <Text
                  fz={14}
                  ta={"center"}
                  fw={700}
                  c={"rgba(34, 166, 241, 1)"}>
                  {course?.teacher.user.firstName +
                    " " +
                    course?.teacher.user.lastName}
                </Text>
                <Text fz={13} ta={"center"} fw={700}>
                  معلم {course?.subject?.name}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mb={20} ta={"center"}>
          {isCompleted ? (
            <>
              <Button>منتهي</Button>
            </>
          ) : (
            <>
              {" "}
              <Button disabled={!isAvilable} onClick={makeCompleted}>
                انهاء الدرس الاول
              </Button>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
