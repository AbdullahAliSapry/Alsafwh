import { GetLessonApi } from "@store/api/LessionApi";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, rem, Tabs } from "@mantine/core";
import classes from "./ContentLessonTeacher.module.css";
import { IconMessageCircle } from "@tabler/icons-react";
import Comments from "@pages/contentCourse/comment/Comments";
const iconStyle = { width: rem(12), height: rem(12) };

export default function ContentLessonTeacher() {
  const { Lesson: lesson } = useSelector((state: RootState) => state.Lesson);

  const dispatch = useDispatch<AppDispatch>();

  const { LessonId } = useParams();
  useEffect(() => {
    if (!LessonId) return;
    dispatch(GetLessonApi(LessonId));
  }, [dispatch, LessonId]);
  return (
    <div className={classes.containerParent}>
      <Box>
        <div style={{ position: "relative", paddingTop: "30.25%" }} className={classes.parentVideo}>
          <iframe
            id="video-player"
            src={lesson?.videoUrl}
            loading="lazy"
            className={classes.styleIframe}
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Box>

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
              <Comments LessonId={lesson?.id as string} />
            </Tabs.Panel>
          </Tabs>
        </Box>

        {/* <Box
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
              <Text fz={14} ta={"center"} fw={700} c={"rgba(34, 166, 241, 1)"}>
                {course?.teacher.user.firstName +
                  " " +
                  course?.teacher.user.lastName}
              </Text>
              <Text fz={13} ta={"center"} fw={700}>
                معلم {course?.subject?.name}
              </Text>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </div>
  );
}
