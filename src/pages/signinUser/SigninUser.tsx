import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SigninUser.module.css";
import {
  Box,
  Container,
  PasswordInput,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa6";
import { IStudentRegister } from "@utilities/interfaces/AuthInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { SignInApi } from "@store/api/AuthApi";
import Spinner from "@shared/spineer/Spinner";
import Swal from "sweetalert2";
import { GetAllYears } from "@store/api/YearApi";
import { useTranslation } from "react-i18next";
import useSignUpSchema from "@schemas/signUpSchema";
import Logo from "@assets/Alsafwa/12.png";
interface Department {
  value: string;
  name: string;
}
// الصف الأول الثانوى
export default function SigninUser() {
  const { t, i18n } = useTranslation(); // Initialize translation
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { IsLoading } = useSelector((state: RootState) => state.Auth);
  const initialValues: IStudentRegister = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Phone: "",
    Location: "",
    Gender: "male",
    FatherPhone: "",
    Specialization: "",
    Img: null,
    ImgIdentity: null,
    YearId: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const { IsRegistered } = useSelector((state: RootState) => state.Auth);
  const { years } = useSelector((state: RootState) => state.Year);
  const navigate = useNavigate();
  const gender = [
    {
      name: t("signin.Gender.male"),
      value: "male",
    },
    {
      name: t("signin.Gender.female"),
      value: "female",
    },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: useSignUpSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values: IStudentRegister) => {
      const formData = new FormData();
      formData.append("FirstName", values.FirstName);
      formData.append("LastName", values.LastName);
      formData.append("Email", values.Email);
      formData.append("Password", values.Password);
      formData.append("ConfirmedPassword", values.ConfirmPassword);
      formData.append("Phone", values.Phone);
      formData.append("Location", values.Location);
      formData.append("Gender", values.Gender);
      formData.append("FatherPhone", values.FatherPhone);
      formData.append("Specialization", values.Specialization);
      formData.append("YearId", values.YearId);
      if (values.Img && values.ImgIdentity) {
        formData.append("Img", values.Img);
        formData.append("ImgIdentity", values.ImgIdentity);
      }
      dispatch(SignInApi(formData));
    },
  });

  useEffect(() => {
    if (IsRegistered) {
      Swal.fire({
        title: t("signin.registrationPromptTitle"),
        text: t("signin.registrationPromptText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("signin.BtnConfirm"),
        cancelButtonText: t("signin.BtnCancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }, [IsRegistered, navigate, t]);

  useEffect(() => {
    dispatch(GetAllYears());
  }, [dispatch]);

  const departments: Department[] = t("signin.departments", {
    returnObjects: true,
  });

  const [imgName, setImgName] = useState<string | null>(null);
  const [imgIdentityName, setImgIdentityName] = useState<string | null>(null);
  // Handle file input change and store the file name
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      if (type === "Img") {
        setImgName(file.name);
      } else if (type === "ImgIdentity") {
        setImgIdentityName(file.name);
      }
      formik.setFieldValue(type, file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {IsLoading && <Spinner />}
      <Box display={"grid"} style={{ justifyContent: "center" }}>
        <Container
          my={50}
          display={"grid"}
          style={{ gap: "1rem" }}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <Text
            className={
              computedColorScheme === "light"
                ? classes.titleLight
                : classes.titleDark
            }
            ta={"center"}
            fz={30}
            fw={700}
            c={"#408fff"}>
            {t("signin.title")}
          </Text>
          <div className={classes.ParentData}>
            <div className={classes.ContainerLogo}>
              <img src={Logo} alt="" />
            </div>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="FirstName"
                placeholder={t("signin.firstNamePlaceholder")}
                className={classes.input}
                value={formik.values.FirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.FirstName && formik.errors.FirstName ? (
                <Text c="red">{formik.errors.FirstName}</Text>
              ) : null}
              <input
                type="text"
                name="LastName"
                placeholder={t("signin.lastNamePlaceholder")}
                className={classes.input}
                value={formik.values.LastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.LastName && formik.errors.LastName ? (
                <Text c="red">{formik.errors.LastName}</Text>
              ) : null}
              <Box display={"flex"} style={{ gap: "1rem" }}>
                <div>
                  <input
                    type="text"
                    name="Phone"
                    placeholder={t("signin.phonePlaceholder")}
                    style={{ width: "100%" }}
                    className={classes.input}
                    value={formik.values.Phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Phone && formik.errors.Phone ? (
                    <Text c="red">{formik.errors.Phone}</Text>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="FatherPhone"
                    placeholder={t("signin.fatherPhonePlaceholder")}
                    style={{ width: "100%" }}
                    className={classes.input}
                    value={formik.values.FatherPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.FatherPhone && formik.errors.FatherPhone ? (
                    <Text c="red">{formik.errors.FatherPhone}</Text>
                  ) : null}
                </div>
              </Box>
              <input
                type="email"
                name="Email"
                placeholder={t("signin.emailPlaceholder")}
                className={classes.input}
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Email && formik.errors.Email ? (
                <Text c="red">{formik.errors.Email}</Text>
              ) : null}
              <input
                type="text"
                name="Location"
                placeholder={t("signin.locationPlaceholder")}
                className={classes.input}
                value={formik.values.Location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Location && formik.errors.Location ? (
                <Text c="red">{formik.errors.Location}</Text>
              ) : null}
              <select
                name="YearId"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("Specialization", "");
                }}
                value={formik.values.YearId}
                onBlur={formik.handleBlur}
                className={classes.input}>
                <option value="">{t("signin.yearPlaceholder")}</option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
              {formik.touched.YearId && formik.errors.YearId ? (
                <Text c="red">{formik.errors.YearId}</Text>
              ) : null}
              <select
                name="Specialization"
                onChange={formik.handleChange}
                value={formik.values.Specialization}
                onBlur={formik.handleBlur}
                className={classes.input}>
                <option value="" disabled>
                  {i18n.language === "ar" ? "التخصص" : "Specialization"}
                </option>
                {formik.values.YearId ===
                years.find((year) => year.name.trim() === "الصف الأول الثانوى")
                  ?.id ? (
                  <option value={departments[0].value}>
                    {departments[0].name}{" "}
                  </option>
                ) : formik.values.YearId ===
                  years.find(
                    (year) => year.name.trim() === "الصف الثانى الثانوى"
                  )?.id ? (
                  <>
                    <option value={departments[1].value}>
                      {departments[1].name}
                    </option>
                    <option value={departments[2].value}>
                      {" "}
                      {departments[2].name}
                    </option>
                  </>
                ) : formik.values.YearId ===
                  years.find(
                    (year) => year.name.trim() === "الصف الثالث الثانوى"
                  )?.id ? (
                  <>
                    <option value={departments[3].value}>
                      {departments[3].name}
                    </option>
                    <option value={departments[4].value}>
                      {departments[4].name}
                    </option>
                    <option value={departments[1].value}>
                      {departments[1].name}
                    </option>
                  </>
                ) : (
                  departments.map(
                    (department: { value: string; name: string }) => (
                      <option key={department.value} value={department.value}>
                        {department.name}
                      </option>
                    )
                  )
                )}
              </select>

              {formik.touched.Specialization && formik.errors.Specialization ? (
                <Text c="red">{formik.errors.Specialization}</Text>
              ) : null}
              <select
                name="Gender"
                onChange={formik.handleChange}
                value={formik.values.Gender}
                onBlur={formik.handleBlur}
                className={classes.input}>
                {gender.map((ge) => (
                  <option key={ge.value} value={ge.value}>
                    {ge.name}
                  </option>
                ))}
              </select>

              {formik.touched.Gender && formik.errors.Gender ? (
                <Text c="red">{formik.errors.Gender}</Text>
              ) : null}
              <label
                className={`${classes.input} ${classes.LapelImg}`}
                htmlFor="ImgIdentity">
                {imgIdentityName || t("signin.imgIdentityLabel")}
                <span>
                  <FaImages />
                </span>
              </label>
              <input
                type="file"
                name="ImgIdentity"
                id="ImgIdentity"
                hidden
                onChange={(event) => handleImageChange(event, "ImgIdentity")}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ImgIdentity && formik.errors.ImgIdentity ? (
                <Text c="red">{formik.errors.ImgIdentity}</Text>
              ) : null}
              <label
                className={`${classes.input} ${classes.LapelImg}`}
                htmlFor="Img">
                {imgName || t("signin.imgLabel")}
                <span>
                  <FaImages />
                </span>
              </label>
              <input
                type="file"
                name="Img"
                hidden
                id="Img"
                onChange={(event) => handleImageChange(event, "Img")}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Img && formik.errors.Img ? (
                <Text c="red">{formik.errors.Img}</Text>
              ) : null}

              <PasswordInput
                p={"0"}
                type="password"
                name="Password"
                placeholder={t("signin.passwordPlaceholder")}
                className={classes.inputPassword}
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <Text c="red" style={{ maxWidth: "350px" }}>
                  {" "}
                  {formik.errors.Password}
                </Text>
              ) : null}
              <PasswordInput
                p={"0"}
                type="password"
                name="ConfirmPassword"
                placeholder={t("signin.confirmPasswordPlaceholder")}
                className={classes.inputPassword}
                value={formik.values.ConfirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ConfirmPassword &&
              formik.errors.ConfirmPassword ? (
                <Text c="red" style={{ maxWidth: "350px" }}>
                  {formik.errors.ConfirmPassword}
                </Text>
              ) : null}
              <Box
                mt={10}
                display={"grid"}
                style={{ justifyContent: "center" }}>
                <button type="submit" className={classes.btnSumbit}>
                  {t("signin.submitButton")}
                </button>
              </Box>
              <Text fz={15} ta={"center"}>
                {t("signin.alreadyHaveAccount")}{" "}
                <Link
                  style={{ color: "#408fff", marginRight: "5px" }}
                  to={"/login"}>
                  {t("signin.loginLink")}
                </Link>
              </Text>
            </form>
          </div>
        </Container>
      </Box>
    </motion.div>
  );
}
