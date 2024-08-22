import Styles from "./AddQuestion.module.css";
import { Box, Button, Text, useComputedColorScheme } from "@mantine/core";
import { QuestionSchema } from "@schemas/PublicSchema";
import Spinner from "@shared/spineer/Spinner";
import { AddQuestionApi } from "@store/api/QustionApi";
import { AppDispatch, RootState } from "@store/Store";
import { IAnswer } from "@utilities/interfaces/PublicInterfce";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TypeQuestions = ["Img", "Text"];

interface FormValues {
  text: string;
  typeQustion: string;
  Img: File | null;
  choices: string[];
  correctAnswer: string;
  point: string;
}

export default function AddQuestion() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { loading } = useSelector((state: RootState) => state.Question);

  const { ExamId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<FormValues>({
    initialValues: {
      text: "",
      typeQustion: TypeQuestions[1],
      Img: null,
      choices: Array(2).fill(""),
      correctAnswer: "",
      point: "",
    },
    validationSchema: QuestionSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const AnswerDtos: Omit<IAnswer, "id" | "questionId">[] = [];

      for (let i = 0; i < values.choices.length; i++) {
        AnswerDtos.push({
          text: values.choices[i],
          isCorrect: values.correctAnswer === values.choices[i],
        });
      }

      const formData = new FormData();
      formData.append("Text", values.text);
      formData.append("TypeQustion", values.typeQustion);
      if (values.typeQustion === "Img" && values.Img) {
        formData.append("Img", values.Img);
      }
      if (!ExamId) {
        toast.error("Invalid Exam Id");
        return;
      }
      formData.append("QuizeId", ExamId);
      formData.append("Point", values.point);
      if (AnswerDtos.length > 0) {
        formData.append("AnswerDtosJson", JSON.stringify(AnswerDtos));
      }
      dispatch(AddQuestionApi(formData));

      formik.resetForm();
    },
  });

  const handleNumChoicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (count >= 2) {
      const choices = Array(count).fill("");
      formik.setFieldValue("choices", choices);
      formik.setFieldValue("correctAnswer", "");
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...formik.values.choices];
    newChoices[index] = value;
    formik.setFieldValue("choices", newChoices);
  };

  return (
    <div>
      {loading && <Spinner />}
      <Box
        pt={50}
        bg={computedColorScheme === "light" ? "" : "rgb(36,36,36)"}
        style={{ border: "1px solid rgba(255, 255, 255, 0.334)" }}
        className={Styles.parent}>
        <Text fz={35} c={"rgb(65, 130, 249)"} ta={"center"} my={50} fw={700}>
          إضافة سؤال
        </Text>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div>
            <label htmlFor="type">نوع السؤال</label>
            <select
              name="typeQustion"
              className={Styles.inputExamSelect}
              id="type"
              value={formik.values.typeQustion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
              {TypeQuestions.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formik.touched.typeQustion && formik.errors.typeQustion && (
              <div className={Styles.errorText}>
                {formik.errors.typeQustion}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="question">درجة السؤال</label>
            <input
              className={Styles.inputExam}
              type="text"
              id="question"
              name="point"
              placeholder="أدخل درجة السؤال"
              value={formik.values.point}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.point && formik.errors.point && (
              <div className={Styles.errorText}>{formik.errors.point}</div>
            )}
          </div>
          <div>
            <label htmlFor="question">نص السؤال</label>
            <input
              className={Styles.inputExam}
              type="text"
              id="question"
              name="text"
              placeholder="أدخل نص السؤال"
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.text && formik.errors.text && (
              <div className={Styles.errorText}>{formik.errors.text}</div>
            )}
          </div>
          {formik.values.typeQustion === "Img" && (
            <>
              <div className={Styles.StyleInputImg}>
                <label htmlFor="img">صوره السؤال</label>
                <input
                  className={Styles.inputExam}
                  type="file"
                  id="img"
                  name="Img"
                  onChange={(e) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      formik.setFieldValue("Img", e.currentTarget.files[0]);
                    }
                  }}
                />
                {formik.touched.Img && formik.errors.Img && (
                  <div className={Styles.errorText}>{formik.errors.Img}</div>
                )}
              </div>
            </>
          )}
          <div>
            <label htmlFor="numChoices">عدد الاختيارات</label>
            <input
              className={Styles.inputExam}
              type="number"
              id="numChoices"
              value={formik.values.choices.length}
              onChange={handleNumChoicesChange}
              min={2}
              required
            />
            {formik.touched.choices && formik.errors.choices && (
              <div className={Styles.errorText}>
                {Array.isArray(formik.errors.choices)
                  ? formik.errors.choices[0]
                  : formik.errors.choices}
              </div>
            )}
          </div>
          {formik.values.choices.map((choice, index) => (
            <div key={index}>
              <label htmlFor={`choice-${index}`}>اختيار {index + 1}</label>
              <input
                className={Styles.inputExam}
                type="text"
                id={`choice-${index}`}
                placeholder={`اختيار ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                required
              />
              {formik.touched.choices && formik.errors.choices && (
                <div className={Styles.errorText}>
                  {Array.isArray(formik.errors.choices)
                    ? formik.errors.choices[index] || "خطأ في الاختيار"
                    : formik.errors.choices}
                </div>
              )}
            </div>
          ))}

          {formik.values.choices.length > 0 && (
            <div className={Styles.parentSelect}>
              <label htmlFor="correctAnswer">الإجابة الصحيحة</label>
              <select
                className={Styles.inputExamSelect}
                id="correctAnswer"
                name="correctAnswer"
                value={formik.values.correctAnswer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                <option value="" disabled>
                  اختر الإجابة الصحيحة
                </option>
                {formik.values.choices
                  .filter((choice) => choice.trim() !== "")
                  .map((choice, index) => (
                    <option key={index} value={choice}>
                      اختيار {index + 1}: {choice}
                    </option>
                  ))}
              </select>
              {formik.touched.correctAnswer && formik.errors.correctAnswer && (
                <div className={Styles.errorText}>
                  {formik.errors.correctAnswer}
                </div>
              )}
            </div>
          )}
          <Box
            mt={20}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              gap: "2rem",
            }}>
            <Box>
              <Button
                type="submit"
                bg={"rgba(34, 166, 241, 1)"}
                className={Styles.linksNext}>
                حفظ
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
}
