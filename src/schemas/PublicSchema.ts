/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
export const FilterSchema = Yup.object().shape({
  Year: Yup.string().optional(),
  Specialization: Yup.string()
    .oneOf(["Science", "Mathematical", "Literary"], "التخصص غير مومجود")
    .optional(),
  Subject: Yup.string().optional(),
});

export const CommentSchema = Yup.object().shape({
  Text: Yup.string()
    .required("يجب عليك ادخال نص")
    .max(500, "الحد الاقصي 500 حرف")
    .min(3, "الحد الادني 3 احرف"),
});

export const ContactSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    name: Yup.string().required(t("contactForm.validation.nameRequired")),
    email: Yup.string()
      .email(t("contactForm.validation.invalidEmail"))
      .required(t("contactForm.validation.emailRequired")),
    description: Yup.string()
      .required(t("contactForm.validation.descriptionRequired"))
      .max(500, t("contactForm.validation.descriptionMax")),
    phone: Yup.string()
      .required(t("contactForm.validation.phoneRequired"))
      .matches(/^01[0-2,5]\d{8}$/, t("contactForm.validation.invalidPhone")),
  });
};

export const ExamSchema = Yup.object().shape({
  description: Yup.string()
    .required("يجب عليك ادخال نص")
    .max(500, "الحد الاقصي 500 حرف")
    .min(3, "الحد الادني 3 احرف"),
  numberQustion: Yup.number()
    .min(1, "عدد الأسئلة يجب أن يكون أكثر من 0")
    .required("عدد الاسئله مطلوب"),
  quizeTime: Yup.number()
    .min(1, "وقت الامتحان يجب أن يكون أكثر من 0 دقيقة")
    .required("وقت الامحتان مطلوب"),
  Title: Yup.string()
    .required("عنوان الامتحان مطلوب")
    .min(10, "العنوان لا يقل عن عشره احرف"),
});

export const QuestionSchema = Yup.object().shape({
  text: Yup.string().required("نص السؤال مطلوب"),
  typeQustion: Yup.string().oneOf(["Img", "Text"]).required("نوع السؤال مطلوب"),
  Img: Yup.mixed().when("typeQustion", {
    is: (value: any) => value === "Img",
    then: (schema) =>
      schema
        .required("الصورة مطلوبة")
        .test("fileSize", "حجم الصورة كبير جداً", (value) => {
          return value instanceof File ? value.size <= 20 * 1024 * 1024 : true; // 20MB limit
        })
        .test("fileType", "نوع الملف غير مسموح", (value) => {
          return value instanceof File
            ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
            : true;
        }),
    otherwise: (schema) => schema.nullable(),
  }),
  choices: Yup.array()
    .of(Yup.string().required("هذا الحقل مطلوب"))
    .min(2, "يجب إدخال اختيارين على الأقل"),
  correctAnswer: Yup.string().required("الإجابة الصحيحة مطلوبة"),
  point: Yup.string().required("درجه السؤال مطلوبه"),
});

export const PayMentSchema = Yup.object().shape({
  typeSubscription: Yup.string().required("نوع الاشتراك مطلوب"),
  price: Yup.number().required("السعر مطلوب"),
  subscriptionMonth: Yup.string().when(
    "typeSubscription",
    (typeSubscription) => {
      if (+typeSubscription === 0) {
        return Yup.string().required("من فضلك ادخل الاشتراك");
      }
      return Yup.number();
    }
  ),
  discountCoupon: Yup.string(),
  name: Yup.string().required("الاسم مطلوب"),
});

export const FeedBackCourseSchema = () => {
  const { t } = useTranslation();

  return Yup.object({
    courseId: Yup.string().required(
      t("feedBackCourse.validation.courseIdRequired")
    ),
    userId: Yup.string().required(
      t("feedBackCourse.validation.userIdRequired")
    ),
    description: Yup.string()
      .required(t("feedBackCourse.validation.descriptionRequired"))
      .max(500, t("feedBackCourse.validation.descriptionMax")),
    rate: Yup.number()
      .required(t("feedBackCourse.validation.rateRequired"))
      .min(1, t("feedBackCourse.validation.rateMin"))
      .max(5, t("feedBackCourse.validation.rateMax")),
  });
};
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}[\]:;"'<>,.?~`/\\|])[A-Za-z\d@!#$%^&*()_+{}[\]:;"'<>,.?~`/\\|]{8,}$/;

export const SchemaChangePassword = () => {
  const { t } = useTranslation();

  return Yup.object({
    oldPassword: Yup.string().required(t("student.oldPasswordRequire")),
    newPassword: Yup.string()
      .min(8, t("student.passwordLength"))
      .required(t("validationRegister.PasswordRequired"))
      .matches(passwordRegex, t("validationRegister.PasswordComplexity")),

    confirmPassword: Yup.string()
      .required(t("validationRegister.ConfirmPasswordRequired"))
      .oneOf(
        [Yup.ref("newPassword")],
        t("validationRegister.ConfirmPasswordMatch")
      ),
  });
};
