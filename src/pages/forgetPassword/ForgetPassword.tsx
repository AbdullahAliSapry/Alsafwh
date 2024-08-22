import { Box, Container, Text } from "@mantine/core";
import classes from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { ForgetPasswordApi } from "@store/api/AuthApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SchemaReset = Yup.object({
  email: Yup.string()
    .email("ادخل بريد الكتروني صحيح")
    .required("البريد الالكتروني مطلوب"),
});

export default function ForgetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SchemaReset,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(ForgetPasswordApi(values.email));

      let timerInterval: number;
      Swal.fire({
        title: "سيتم تحويلك لصفحه تغير كلمه المرور",
        html: "بعد <b></b> ثواني",
        timer: 3000,
        icon: "success",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup()?.querySelector("b");
          if (timer) {
            timerInterval = window.setInterval(() => {
              const secondsLeft = Math.ceil(Swal.getTimerLeft()! / 1000);
              timer.textContent = `${secondsLeft}`;
            }, 100);
          }
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/reset-password");
        }
      });
    },
  });

  return (
    <Box display={"grid"} style={{ justifyContent: "center" }}>
      <Container my={50} display={"grid"} style={{ gap: "1rem" }}>
        <Text
          className={classes.title}
          ta={"center"}
          fz={30}
          fw={700}
          c={"#408fff"}>
          تغيير كلمة المرور
        </Text>

        <form
          noValidate
          onSubmit={formik.handleSubmit}
          className={classes.form}>
          <input
            type="email"
            name="email"
            placeholder="البريد الالكتروني"
            className={classes.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text c="red">{formik.errors.email}</Text>
          ) : null}
          <Box mt={10} display={"grid"} style={{ justifyContent: "center" }}>
            <button type="submit" className={classes.btnSumbit}>
              ارسال{" "}
            </button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
