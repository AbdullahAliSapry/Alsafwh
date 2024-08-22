import { Link } from "react-router-dom";
import classes from "./LoginUser.module.css";
import { Box, Container, Text } from "@mantine/core";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { LoginApi } from "@store/api/AuthApi";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { useLoginSchema } from "@schemas/loginSchema";

export default function LoginUser() {
  const { t,i18n } = useTranslation(); // Initialize translation
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: useLoginSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      dispatch(LoginApi(values.email, values.password, i18n.language));
    },
  });

  return (
    <Box display={"grid"} style={{ justifyContent: "center" }}>
      <Container
        my={50}
        display={"grid"}
        style={{ gap: "1rem" }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Text
          className={classes.title}
          ta={"center"}
          fz={30}
          fw={700}
          c={"#408fff"}>
          {t("login.title")}
        </Text>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <input
            type="email"
            name="email"
            placeholder={t("login.emailPlaceholder")}
            className={classes.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text c="red">{formik.errors.email}</Text>
          ) : null}
          <input
            type="password"
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            className={classes.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text c="red">{formik.errors.password}</Text>
          ) : null}
          <Box mt={10} display={"grid"} style={{ justifyContent: "center" }}>
            <Link
              to={`/forget-password`}
              style={{ color: "#408fff", marginRight: "5px" }}
              className={classes.LinkReset}>
              {t("login.forgotPassword")} {/* Use translation */}
            </Link>
          </Box>
          <Box mt={10} display={"grid"} style={{ justifyContent: "center" }}>
            <button type="submit" className={classes.btnSumbit}>
              {t("login.submitButton")} {/* Use translation */}
            </button>
          </Box>
          <Text fz={15} ta={"center"}>
            {t("login.noAccount")} {/* Use translation */}
            <Link
              style={{ color: "#408fff", marginRight: "5px" }}
              to={"/signin"}>
              {t("login.createAccount")} {/* Use translation */}
            </Link>
          </Text>
        </form>
      </Container>
    </Box>
  );
}
