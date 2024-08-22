import {
  Box,
  Button,
  Container,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./FeedbackCourse.module.css";
import image from "@assets/Alsafwa/img.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { IFeedBackCourse } from "@utilities/interfaces/PublicInterfce";
import { FeedBackCourseSchema } from "@schemas/PublicSchema";
import FeedBackCard from "./FeedBackCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import {
  AddFeedBackCoursesApi,
  GetAllCoursesFeedBackApi,
} from "@store/api/CoursesFeedBackApi";
import Spinner from "@shared/spineer/Spinner";
import { useEffect } from "react";
import { GetCoursesToStudentApi } from "@store/api/StudentApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function FeedbackCourse() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { CourseId } = useParams();
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const navigate = useNavigate();
  const { studentCourses } = useSelector((state: RootState) => state.Student);
  const { loading, CoursesFeedBacks } = useSelector(
    (state: RootState) => state.FeedBackCourses
  );
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: Omit<IFeedBackCourse, "id" | "isConfirmed" | "user"> = {
    courseId: CourseId as string,
    rate: 0,
    description: "",
    userId: AuthModel?.userId as string,
  };
  const course = studentCourses.find((e) => e.id === CourseId);
  const formik = useFormik({
    initialValues,
    validationSchema: FeedBackCourseSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      if (!AuthModel) {
        toast.success(t("feedbackCourse.loginFirst"));
        navigate("/login");
        return;
      }
      if (!course) {
        toast.warning(t("feedbackCourse.registerFirst"));
        return;
      }
      dispatch(AddFeedBackCoursesApi(values, t("feedbackCourse.Message")));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (!CourseId) return;
    dispatch(GetAllCoursesFeedBackApi(CourseId));
  }, [CourseId, dispatch]);

  useEffect(() => {
    if (AuthModel?.userId && studentCourses.length === 0) {
      dispatch(GetCoursesToStudentApi(AuthModel?.userId));
    }
  }, [AuthModel?.userId, dispatch, studentCourses]);

  return (
    <>
      {loading && <Spinner />}
      <Container
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        my={50}
        className={
          computedColorScheme === "light"
            ? classes.topParentLight
            : classes.topParentDark
        }>
        <div className={classes.parent}>
          <Box
            className={`${
              computedColorScheme === "light"
                ? classes.styleBackLight
                : classes.styleBackDark
            }`}>
            <Text
              className={`${classes.titleStyle} ${
                computedColorScheme === "light"
                  ? classes.titleLight
                  : classes.titleDark
              }`}
              fw={700}
              fz={28}>
              {t("feedbackCourse.allOpinions")}
            </Text>
          </Box>
        </div>
        {CoursesFeedBacks.length > 0 ? (
          <div>
            {CoursesFeedBacks.map((feed) => {
              return <FeedBackCard key={feed.id} feedBack={feed} />;
            })}
          </div>
        ) : (
          <h3 className={classes.NotFoundStyle}>
            {t("feedbackCourse.noOpinions")}
          </h3>
        )}
        <Container
          mt={100}
          pb={20}
          pt={60}
          bg={computedColorScheme === "light" ? "white" : "rgb(36,36,36)"}
          style={{ borderRadius: "15px", width: "fit-content" }}
          className={classes.styleForm}>
          <Box className={classes.containerForm}>
            <form onSubmit={formik.handleSubmit}>
              <Text fw={700} fz={23} mb={30} c={"rgba(34, 166, 241, 1)"}>
                {t("feedbackCourse.shareOpinion")}
              </Text>
              <input
                type="text"
                hidden
                value={formik.values.userId}
                name="userId"
                onChange={formik.handleChange}
              />
              <input
                type="text"
                hidden
                value={formik.values.courseId}
                name="courseId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div>
                <textarea
                  className={classes.inputComment}
                  name="description"
                  placeholder={t("feedbackCourse.notesPlaceholder")}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Text c="red">{formik.errors.description}</Text>
                ) : null}
              </div>
              <div>
                <input
                  className={classes.inputComment}
                  name="rate"
                  type="number"
                  placeholder={t("feedbackCourse.ratingPlaceholder")}
                  value={formik.values.rate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rate && formik.errors.rate ? (
                  <Text c="red">{formik.errors.rate}</Text>
                ) : null}
              </div>
              <Box ta={"center"}>
                <Button
                  px={40}
                  py={5}
                  fz={20}
                  fw={500}
                  my={20}
                  variant="filled"
                  color={"rgba(175, 202, 255, 1)"}
                  type={"submit"}
                  c={"black"}>
                  {t("feedbackCourse.submit")}
                </Button>
              </Box>
            </form>
            <Box>
              <img src={image} className={classes.styleImage} alt="" />
            </Box>
          </Box>
          <Box
            ta={"center"}
            my={20}
            c={computedColorScheme === "light" ? "black" : "white"}>
            <Text fz={10} fw={400} mb={10}>
              {t("feedbackCourse.improvementMessage")}
            </Text>
            <Text fz={10} fw={400}>
              {t("feedbackCourse.anotherImprovementMessage")}
            </Text>
          </Box>
        </Container>
        <Box ta={"end"} mt={50}>
          <Link
            to={`/content-course/${CourseId}`}
            className={classes.backToCourse}>
            {t("feedbackCourse.backToCourse")}
          </Link>
        </Box>
        {/* <Box>
          <Modal
            styles={{
              header: { paddingBottom: "0px", paddingTop: "0px" },
              content: {
                color: computedColorScheme === "light" ? "black" : "white",
              },
            }}
            centered
            opened={opened}
            onClose={close}
            title="">
            <Text ta={"center"} fw={700}>
              {t("feedbackCourse.thankYou")}
            </Text>
          </Modal>
        </Box> */}
      </Container>
    </>
  );
}
