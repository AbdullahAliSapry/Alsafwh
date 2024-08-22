import {
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Modal,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./AllFeedback.module.css";
import { Carousel } from "@mantine/carousel";
import image from "@assets/Alsafwa/img.png";
import { useDisclosure } from "@mantine/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { AddFeedbackApi, GetAllFeedbackApi } from "@store/api/FeedBackApi";
import { toast } from "react-toastify";
import Image from "@assets/Alsafwa/Ok.jpeg";
import Spinner from "@shared/spineer/Spinner";
import { useEffect } from "react";
import { addFeedback } from "@store/slices/FeedBackSlice";

const SchemaFeedback = Yup.object().shape({
  text: Yup.string()
    .required("من فضلك ادخل رايك")
    .max(300, "المسموح به 300 حرف بحد اقصي"),
});
export default function AllFeedback() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [opened, { open, close }] = useDisclosure(false);


  const dispatch = useDispatch<AppDispatch>();
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const { isLoading, isSubmitted, feedbacks } = useSelector(
    (state: RootState) => state.FeedBack
  );

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: SchemaFeedback,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      if (!AuthModel || !AuthModel?.userId) {
        toast.error("من فضلك سجل الدخول اولا");
        return;
      }
      dispatch(
        AddFeedbackApi({ text: values.text, userId: AuthModel?.userId })
      );
    },
  });
  useEffect(() => {
    if (isSubmitted) {
      open();
      dispatch(addFeedback({ loading: false, submit: false }));
    }
  }, [dispatch, isSubmitted,open]);

  useEffect(() => {
    dispatch(GetAllFeedbackApi());
  }, [dispatch]);

  return (
    <Container
      my={50}
      className={
        computedColorScheme == "light"
          ? classes.topParentLight
          : classes.topParentDark
      }>
      {isLoading && <Spinner />}
      <div className={classes.parent}>
        <Box
          className={`${
            computedColorScheme == "light"
              ? classes.styleBackLight
              : classes.styleBackDark
          }`}>
          <Text
            className={`${classes.titleStyle} ${
              computedColorScheme == "light"
                ? classes.titleLight
                : classes.titleDark
            }`}>
            كل الاراء
          </Text>
        </Box>
      </div>

      <Carousel
        styles={{
          indicator: { backgroundColor: "rgba(69, 79, 255, 1)" },
          control: { backgroundColor: "rgb(69,79,255 ,1)", color: "white" },
        }}
        withIndicators
        height={"auto"}
        style={{ direction: "ltr" }}
        loop
        dragFree
        slideGap="md"
        align="start">
        {feedbacks.map((feedback) => {
          return (
            <Carousel.Slide
              key={feedback.id}
              className={
                computedColorScheme == "light"
                  ? classes.slideLight
                  : classes.slideDark
              }>
              <Box
                c={"white"}
                px={40}
                py={30}
                className={classes.styleSize}
                bg={"rgba(69, 79, 255, 1)"}
                style={{ borderRadius: "15px" }}>
                <Group></Group>
                <Text pl={54} pt="sm" size="sm">
                  {feedback.text}
                </Text>
              </Box>
              <Box className={classes.info}>
                <Avatar
                  src={
                    feedback
                      ? feedback.imgUrl
                      : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                  }
                  alt="Jacob Warnhalter"
                  radius="xl"
                />
                <Box>
                  <Text size="sm">
                    {feedback.name ? feedback.name : "شخصا ما"}
                  </Text>
                </Box>
              </Box>
            </Carousel.Slide>
          );
        })}
      </Carousel>

      <Container
        mt={50}
        pb={20}
        pt={60}
        bg={computedColorScheme == "light" ? "white" : "rgb(36,36,36)"}
        style={{ borderRadius: "15px", width: "fit-content" }}
        className={classes.styleForm}>
        <Box className={classes.containerForm}>
          <form onSubmit={formik.handleSubmit}>
            <Text fw={700} fz={23} mb={30}>
              شاركنا رأيك
            </Text>

            <input
              className={classes.inputComment}
              type="text"
              name="text"
              placeholder="ملاحظاتك"
              // required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
            />
            {formik.touched.text && formik.errors.text ? (
              <Text c="red">{formik.errors.text}</Text>
            ) : null}
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
                ارسال
              </Button>
            </Box>
          </form>

          <Box>
            <>
              {/* {<>{handleSubmit}</>} */}
              <Modal
                styles={{
                  header: { paddingBottom: "0px", paddingTop: "0px" },
                  content: {
                    color: computedColorScheme == "light" ? "black" : "white",
                  },
                }}
                centered
                opened={opened}
                onClose={close}
                title="">
                <Box className={classes.ConImgOk}>
                  <img src={Image} className={classes.styleImageOk} alt="" />
                </Box>
                <Text ta={"center"} fw={700}>
                  شكراً لمشاركتك ملاحظاتك معنا
                </Text>
              </Modal>
            </>
          </Box>

          <Box>
            <img src={image} className={classes.styleImage} alt="" />
          </Box>
        </Box>

        <Box
          ta={"center"}
          my={20}
          c={computedColorScheme == "light" ? "black" : "white"}>
          <Text fz={10} fw={400} mb={10}>
            نحن نسعى دائماً لتحسين خدماتنا بناءً على ملاحظاتك القيمة. نرجو منك
            تخصيص بعض الوقت لتزويدنا بملاحظاتك وتجربتك مع خدماتنا.
          </Text>
          <Text fz={10} fw={400}>
            نحن نسعى دائماً لتحسين خدماتنا بناءً على ملاحظاتك القيمة. نرجو منك
            تخصيص بعض
          </Text>
        </Box>
      </Container>
    </Container>
  );
}
