import {
  Box,
  Button,
  Container,
  NumberInput,
  Text,
  TextInput,
  useComputedColorScheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import classes from "./SingleCoursePayMent.module.css";
import image from "@assets/Alsafwa/cash.png";
import { AppDispatch, RootState } from "@store/Store";
import { GetCodeDiscountToCourse, GetSingleCourse } from "@store/api/CourseApi";
import { CreatePayMentSingleCourse } from "@store/api/PayMentApi";

export default function SingleCoursePayMent() {
  const { t } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { CourseId, StudentId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { course, isActiveCode, coupon } = useSelector(
    (state: RootState) => state.Course
  );
  const { authTokenSingleCourse } = useSelector(
    (state: RootState) => state.Payment
  );

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (CourseId == null || CourseId === "") return;
    dispatch(GetSingleCourse(CourseId));
  }, [CourseId, dispatch]);

  useEffect(() => {
    if (authTokenSingleCourse) {
      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/864502?payment_token=${authTokenSingleCourse}`;
    }
  }, [authTokenSingleCourse]);

  const formik = useFormik({
    initialValues: {
      DiscountCodeId: "",
      price: course?.price || 0,
    },
    onSubmit: () => {
      if (StudentId && course?.id) {
        if (coupon && coupon.isActive) {
          dispatch(CreatePayMentSingleCourse(StudentId, course?.id, coupon.id));
        } else {
          dispatch(CreatePayMentSingleCourse(StudentId, course?.id));
        }
      } else {
        toast.error("خطأ في الكورس");
        return;
      }
    },
  });

  useEffect(() => {
    if (course?.price) {
      formik.setFieldValue("price", course.price);
    }
  }, [course?.price]);

  const getBackgroundColor = () => {
    return computedColorScheme === "light" ? "white" : "rgb(18,18,18)";
  };

  const getInputBackgroundColor = () => {
    return computedColorScheme === "light" ? "#f0f0f0" : "";
  };

  const validateDiscountCode = (DiscountCode: string) => {
    if (course?.id && DiscountCode.length > 0) {
      if (!isActiveCode) {
        dispatch(GetCodeDiscountToCourse(course.id, DiscountCode));
      } else {
        toast.warn("لقد تم تطبيق الكود");
        return;
      }
    } else {
      toast.warn("لم يتم ادخال اي كوبون");
    }
  };

  useEffect(() => {
    if (isActiveCode && coupon && course) {
      formik.setFieldValue(
        "price",
        course.price - (coupon.couponPercntage * course.price) / 100
      );
    }
  }, [coupon, course, course?.price, isActiveCode]);

  return (
    <Box c={computedColorScheme === "light" ? "black" : "white"}>
      <Container mt={50}>
        <Box
          bg={getInputBackgroundColor()}
          p={15}
          style={{ borderRadius: "15px" }}
          px={15}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            className={classes.handelFlex}>
            <Box>
              <form>
                <Box
                  mb={20}
                  display={"flex"}
                  style={{ gap: "2rem", justifyContent: "space-between" }}
                  className={classes.firstFiled}></Box>
                <Box
                  display={"flex"}
                  style={{
                    gap: "2rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className={classes.firstFiled}>
                  <div className={classes.StyleDiscount}>
                    <TextInput
                      placeholder="كود الخصم"
                      name="DiscountCode"
                      label="هل تمتلك كود خصم"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                    <Button
                      className={classes.buttonRegister}
                      onClick={() => {
                        validateDiscountCode(value);
                      }}>
                      تطبيق الكود
                    </Button>
                  </div>
                </Box>
              </form>
            </Box>

            <Box
              display={"grid"}
              style={{ justifyContent: "center", alignItems: "center" }}>
              <Box mb={-40}>
                <img
                  src={image}
                  className={classes.imageHandel}
                  height={"auto"}
                  alt=""
                />
              </Box>
            </Box>
          </Box>

          <Box mt={50} ta={"center"} c={"red"}>
            <Box w={"100%"} className={classes.styleVodafone}>
              <label className={classes.labelFelid} htmlFor="price">
                سعر الكورس
              </label>
              <input
                type="text"
                style={{
                  border: "0px",
                  backgroundColor: getBackgroundColor(),
                  marginTop: "5px",
                  padding: "auto 0px",
                  width: "300px",
                }}
                id="price"
                name="price"
                disabled
                placeholder="سعر الكورس"
                value={formik.values.price}
                className={classes.inputFiled}
                onChange={(value) => formik.setFieldValue("price", value || 0)}
              />
            </Box>
            <Text mb={25} fw={500} fz={18}>
              {t("Vodafone.transferNumber")}
            </Text>
            <Text mb={25} fw={700} fz={20}>
              ‏‪0 100 400 9170‬‏
            </Text>
            <Text mb={25} fw={700} fz={20}>
              ‏‪0 100 737 1548 ‬‏
            </Text>
            <Text mb={25} fw={500} fz={18}>
              {t("Vodafone.receiptInfo")}
            </Text>
          </Box>
          <Box>
            <div className={classes.StyleTitle}>
              <span>او الدفع عن طريق PayMop</span>
            </div>
            <form className={classes.formStyle} onSubmit={formik.handleSubmit}>
              <div>
                <NumberInput
                  label="سعر الكورس"
                  placeholder="السعر"
                  name="price"
                  onChange={(value) =>
                    formik.setFieldValue("price", value || 0)
                  }
                  disabled
                  value={formik.values.price}
                />
              </div>
              <Button className={classes.buttonRegister} type="submit">
                دفع
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
