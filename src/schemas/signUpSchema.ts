import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}[\]:;"'<>,.?~`/\\|])[A-Za-z\d@!#$%^&*()_+{}[\]:;"'<>,.?~`/\\|]{8,}$/;

const useSignUpSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    YearId: Yup.string().required(t("validationRegister.YearIdRequired")),
    ImgIdentity: Yup.mixed()
      .nullable()
      .required(t("validationRegister.ImgIdentityRequired")),
    Specialization: Yup.string().required(
      t("validationRegister.SpecializationRequired")
    ),
    Location: Yup.string().required(t("validationRegister.LocationRequired")),
    Gender: Yup.string()
      .nullable()
      .required(t("validationRegister.GenderRequired")),
    Email: Yup.string()
      .email(t("validationRegister.EmailInvalid"))
      .required(t("validationRegister.EmailRequired")),
    FatherPhone: Yup.string()
      .min(11, t("validationRegister.FatherPhoneLength"))
      .max(11, t("validationRegister.FatherPhoneLength"))
      .required(t("validationRegister.FatherPhoneRequired"))
      .notOneOf(
        [Yup.ref("Phone")],
        t("validationRegister.FatherPhoneNotMatch")
      ),
    Phone: Yup.string()
      .min(11, t("validationRegister.PhoneLength"))
      .max(11, t("validationRegister.PhoneLength"))
      .required(t("validationRegister.PhoneRequired")),
    Img: Yup.mixed().nullable().required(t("validationRegister.ImgRequired")),
    FirstName: Yup.string()
      .min(3, t("validationRegister.FirstNameLength"))
      .max(20, t("validationRegister.FirstNameLength"))
      .required(t("validationRegister.FirstNameRequired")),
    LastName: Yup.string()
      .min(3, t("validationRegister.LastNameLength"))
      .max(20, t("validationRegister.LastNameLength"))
      .required(t("validationRegister.LastNameRequired")),
    Password: Yup.string()
      .matches(passwordRegex, t("validationRegister.PasswordComplexity"))
      .min(8, t("validationRegister.PasswordLength"))
      .required(t("validationRegister.PasswordRequired")),
    ConfirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("Password")],
        t("validationRegister.ConfirmPasswordMatch")
      )
      .required(t("validationRegister.ConfirmPasswordRequired")),
  });
};

export default useSignUpSchema;
