import { Box, Button, Modal, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import classes from "./StudentPage.module.css";
import { useFormik } from "formik";
import { SchemaChangePassword } from "@schemas/PublicSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import Swal from "sweetalert2";
import { ChangePasswordApi } from "@store/api/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "@shared/spineer/Spinner";
import { useEffect } from "react";

export default function ChangePasswordCom() {
  const [opened, { open, close }] = useDisclosure(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isChanged, AuthModel, IsLoading } = useSelector(
    (state: RootState) => state.Auth
  );
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: SchemaChangePassword(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      Swal.fire({
        title: t("student.TitleConfirm"),
        text: t("student.DescriptionConfirm"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("signin.BtnConfirm"),
        cancelButtonText: t("signin.BtnCancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          if (!AuthModel?.userId) {
            toast.error("Please Login Before Changes to Password");
            navigate("/login");
            return;
          }
          dispatch(ChangePasswordApi({ ...values, userId: AuthModel?.userId }));
          formik.resetForm();
        }
      });
    },
  });

  useEffect(() => {
    if (isChanged) {
      close();
      formik.resetForm();
    }
  }, [close, formik, isChanged]);
  return (
    <div className={classes.parentChangePassword}>
      {IsLoading && <Spinner />}
      <Modal
        opened={opened}
        onClose={close}
        title="change password"
        zIndex={1000}>
        <Box dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <form
            onSubmit={formik.handleSubmit}
            className={classes.StyleChangePassword}>
            <Box w={"100%"}>
              <PasswordInput
                radius="md"
                label={t("student.oldPassword")}
                type="password"
                id="oldPassword"
                name="oldPassword"
                withAsterisk
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                className={classes.inputFiled}
                placeholder={t("student.oldPassword")}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <Text c="red">{formik.errors.oldPassword}</Text>
              ) : null}
            </Box>
            <Box w={"100%"}>
              <PasswordInput
                radius="md"
                label={t("student.newPassword")}
                type="password"
                id="newPassword"
                name="newPassword"
                withAsterisk
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={classes.inputFiled}
                placeholder={t("student.newPassword")}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Text c="red">{formik.errors.newPassword}</Text>
              ) : null}
            </Box>
            <Box w={"100%"}>
              <PasswordInput
                radius="md"
                label={t("student.ConfirmNewPassword")}
                type="password"
                id="ConfirmNewPassword"
                name="confirmPassword"
                withAsterisk
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={classes.inputFiled}
                placeholder={t("student.ConfirmNewPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Text c="red">{formik.errors.confirmPassword}</Text>
              ) : null}
            </Box>
            <Button className="" type="submit">
              {t("student.BtnSubmit")}
            </Button>
          </form>
        </Box>
      </Modal>
      <Button onClick={open}> {t("student.BtnPassword")}</Button>
    </div>
  );
}
