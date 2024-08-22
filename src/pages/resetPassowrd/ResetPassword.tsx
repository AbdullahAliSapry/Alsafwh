import { Box, Container, Text } from "@mantine/core";
import classes from ".././forgetPassword/ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { IResetPassword } from "@utilities/interfaces/PublicInterfce";
import { ResetPasswordApi } from "@store/api/AuthApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SchemaResetPassword = Yup.object({
  email: Yup.string()
    .email("ادخل بريد الكتروني صحيح")
    .required("البريد الالكتروني مطلوب"),
  code: Yup.string().required("الكود المرسل لك مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "يجب أن تتطابق كلمات المرور")
    .required("تأكيد كلمة المرور مطلوب"),
});
export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SchemaResetPassword,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: IResetPassword) => {
      dispatch(ResetPasswordApi(values));
      let timerInterval: number;
      Swal.fire({
        title: "سيتم تحويلك لصفحه تسجيل الدخول",
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
          navigate("/login");
        }
      });
    },
  });
  return (
    <div>
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
            <input
              type="text"
              name="code"
              placeholder="ادخل الكود المرسل لك علي الايميل"
              className={classes.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            {formik.touched.code && formik.errors.code ? (
              <Text c="red">{formik.errors.code}</Text>
            ) : null}
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور الجديدة"
              className={classes.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Text c="red">{formik.errors.password}</Text>
            ) : null}
            <input
              type="password"
              name="confirmPassword"
              placeholder="تاكيد كلمة المرور الجديدة"
              className={classes.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Text c="red">{formik.errors.confirmPassword}</Text>
            ) : null}
            <Box mt={10} display={"grid"} style={{ justifyContent: "center" }}>
              <button type="submit" className={classes.btnSumbit}>
                تعيين كلمه السر{" "}
              </button>
            </Box>
          </form>
        </Container>
      </Box>
    </div>
  );
}
