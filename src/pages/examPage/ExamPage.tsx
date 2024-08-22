import {
  Box,
  Container,
  Divider,
  Text,
  Button,
  useComputedColorScheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@store/Store";
import { GetExamToLessonApi, SendExamToStudent } from "@store/api/ExamApi";
import { IAnswer, IQuizSubmit } from "@utilities/interfaces/PublicInterfce";
import TimerDown from "./Timer/TimerDown";
import classes from "./ExamPage.module.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

interface FormValues {
  answers: Record<string, string>;
}

export default function ExamPage() {
  const [generalError, setGeneralError] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Track submission status

  const dispatch = useDispatch<AppDispatch>();
  const { exam } = useSelector((state: RootState) => state.Exam);
  const { id } = useParams();

  useEffect(() => {
    if (exam || !id) return;
    dispatch(GetExamToLessonApi(id));
  }, [dispatch, exam, id]);

  const handleOptionChange = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
    formik.setFieldValue(`answers.${questionId}`, answerId);
  };

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { student } = useSelector((state: RootState) => state.Student);
  const { examAttemp } = useSelector((state: RootState) => state.Exam);
  console.log(examAttemp);

  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      answers: {},
    },
    validateOnChange: true,
    onSubmit: () => {
      if (isSubmitted) return;
      const submissionData: IQuizSubmit[] = Object.keys(selectedAnswers).map(
        (questionId) => {
          const answerId = selectedAnswers[questionId];
          return {
            QuestionId: questionId,
            AnswerId: answerId,
            StudentId: student?.id || 0,
          };
        }
      );

      Swal.fire({
        title: "تسليم الامتحان",
        text: "هل انت متأكد من تسليم الامتحان!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "تسليم",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsSubmitted(true);
          if (!exam?.id || !student?.id) return;
          dispatch(SendExamToStudent(submissionData, exam?.id, student?.id));
          formik.resetForm();
        }
      });
    },
  });

  useEffect(() => {
    if (examAttemp) {
      Swal.fire({
        title: "تم تسليم الامتحان",
        text: `شكرا لك على تسليم الامتحان! درجتك في الامتحان ${examAttemp.score} من ${examAttemp.allScore}`,
        icon: "success",
      });
      setIsSubmitted(true);
      navigate("/");
    }
  }, [examAttemp, navigate]);

  const handleTimerEnd = () => {
    if (!isSubmitted) {
      // Submit only if not already submitted
      formik.handleSubmit();
    }
  };

  return (
    <Box
      my={50}
      className={classes.parent}
      c={computedColorScheme === "light" ? "" : "white"}>
      {generalError && (
        <Box style={{ color: "red", textAlign: "center" }}>{generalError}</Box>
      )}
      <Box
        w={"fit-content"}
        ml={20}
        style={{ position: "sticky", top: "100px", right: "100%" }}
        ta={"end"}>
        <TimerDown
          initialMinutes={exam?.quizeTime ? +exam.quizeTime : 0}
          onTimerEnd={handleTimerEnd}
        />
      </Box>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          {exam?.qustions?.map((question, index) => (
            <div key={question.id}>
              <Box>
                <Box
                  mb={20}
                  display={"flex"}
                  style={{ justifyContent: "space-between" }}>
                  <Box>
                    <Text c={"rgba(34, 166, 241, 1)"} fw={700} fz={20}>
                      السؤال {index + 1}
                    </Text>
                  </Box>
                </Box>

                <Box className={classes.styleContainer}>
                  <Text>{question.text}</Text>
                  {question.typeQustion !== "Text" &&
                    question.fileUpload?.url && (
                      <Box>
                        <img
                          style={{ borderRadius: "20px" }}
                          src={question.fileUpload.url}
                          width={"300px"}
                          height={"170px"}
                        />
                      </Box>
                    )}
                </Box>
                <Box mt={10}>
                  {question?.answerDtos?.map((answer: IAnswer) => {
                    return (
                      <Box
                        mt={10}
                        key={answer.id}
                        dir="ltr"
                        ta={"end"}
                        fz={15}
                        fw={500}>
                        <label htmlFor={answer.text}>{answer.text}</label>
                        <input
                          className={classes.inputRadio}
                          type="radio"
                          id={answer.id}
                          name={`answer-${question.id}`}
                          value={answer.id}
                          onChange={() =>
                            handleOptionChange(question.id, answer.id)
                          }
                        />
                      </Box>
                    );
                  })}

                  {formik.errors.answers &&
                    formik.errors.answers[question.id] && (
                      <div style={{ color: "red", margin: "10px 0px" }}>
                        {formik.errors.answers[question.id]}
                      </div>
                    )}
                </Box>
                {index + 1 !== exam?.qustions?.length && (
                  <Divider
                    variant="dashed"
                    mt={50}
                    size={"sm"}
                    mx={80}
                    c={"red"}
                  />
                )}
              </Box>
            </div>
          ))}

          <Box ta={"end"}>
            <Button
              px={30}
              py={5}
              fz={20}
              fw={500}
              my={50}
              variant="filled"
              type="submit"
              color={"rgba(0, 208, 121, 1)"}>
              تاكيد
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
