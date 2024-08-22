import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const useLoginSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    email: Yup.string()
      .email(t("validationLogin.email.invalid"))
      .required(t("validationLogin.email.required")),
    password: Yup.string()
      .min(8, t("validationLogin.password.min"))
      .required(t("validationLogin.password.required")),
  });
};
