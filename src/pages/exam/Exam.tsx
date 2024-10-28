import { ExamSchema } from "@schemas/PublicSchema";
import Styles from "./Exam.module.css";
import { Box, Button, Text, useComputedColorScheme } from "@mantine/core";
import { IExam } from "@utilities/interfaces/PublicInterfce";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { AddExamApi } from "@store/api/ExamApi";
import { useEffect } from "react";
import { GetLessonApi } from "@store/api/LessionApi";
import { toast } from "react-toastify";
import { addExam } from "@store/slices/ExamSlice";

export default function Exam() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { Lesson } = useSelector((state: RootState) => state.Lesson);
  const { isAdded, exam } = useSelector((state: RootState) => state.Exam);

  useEffect(() => {
    if (!lessonId) return;
    dispatch(GetLessonApi(lessonId || ""));
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (Lesson?.containQuize) {
      toast.success("هذا الدرس يحتوي عي امتحان بالفعل");
      navigate(`/lesson-details/${Lesson?.courseId}`);
    }
  }, [Lesson, lessonId, navigate]);

  const initialValues: Omit<IExam, "id" | "lessionID" | "isPubliched"> = {
    description: "",
    numberQustion: 0,
    quizeTime: 0,
    title: "",
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: ExamSchema,
    onSubmit: (values) => {
      Swal.fire({
        title: "هل انت متأكد من اضافه الامتحان؟",
        text: "بمجرد اضافه الامتحان لايمكن التعديل عليه!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "الغاء",
        confirmButtonText: "تأكيد الاضافه",
      }).then((result) => {
        if (result.isConfirmed) {
          if (!lessonId) return;
          dispatch(
            AddExamApi({
              ...values,
              lessionID: lessonId,
            })
          );
        }
      });
    },
  });

  useEffect(() => {
    if (isAdded) {
      Swal.fire({
        title: "تمت الاضافه",
        text: "سيتم تحويلك الي صفحه اضافه الاسئله",
        icon: "success",
      });
      navigate(`/add-question/${exam?.id}`);
      dispatch(addExam(false));
    }
  }, []);

  const handleNext = (examId: string |undefined) => {
    if (examId) {
      navigate(`/add-question/${examId}`);
    } else {
      toast.info("يجب اضافه الامتحان اولا");
      return;
    }
  };
  return (
    <Box
      pt={50}
      bg={computedColorScheme == "light" ? "" : "rgb(36,36,36)"}
      style={{ border: "1px solid rgba(255, 255, 255, 0.334)" }}
      className={Styles.parent}>
      <div className={Styles.header}></div>
      {Lesson ? (
        <>
          {" "}
          <Text fz={35} c={" rgb(65, 130, 249)"} ta={"center"} my={50} fw={700}>
            اضافه امتحان
          </Text>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div>
              <label className="title" htmlFor="nameExam">
                عنوان الامتحان
              </label>
              <input
                className={Styles.inputExam}
                type="text"
                id="nameExam"
                name="title"
                placeholder="ادخل العنوان"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <div className={Styles.errorText}>{formik.errors.title}</div>
              )}
            </div>
            <div>
              <label className="dateExam" htmlFor="description">
                وصف الامتحان
              </label>
              <input
                className={Styles.inputExam}
                placeholder="ادخل الوصف"
                type="text"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <div className={Styles.errorText}>
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div>
              <label className="timeExam" htmlFor="timeExam">
                وقت الامتحان (بالدقائق)
              </label>
              <input
                className={Styles.inputExam}
                placeholder="الوقت بالدقائق"
                type="number"
                id="timeExam"
                name="quizeTime"
                value={formik.values.quizeTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quizeTime && formik.errors.quizeTime && (
                <div className={Styles.errorText}>
                  {formik.errors.quizeTime}
                </div>
              )}
            </div>
            <div>
              <label className="TimeToExam" htmlFor="numberQuestion">
                عدد الاسئله
              </label>
              <input
                className={Styles.inputExam}
                type="number"
                placeholder="عدد الاسئله"
                id="numberQuestion"
                name="numberQustion"
                value={formik.values.numberQustion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.numberQustion && formik.errors.numberQustion && (
                <div className={Styles.errorText}>
                  {formik.errors.numberQustion}
                </div>
              )}
            </div>
            <button type="submit">اضافه</button>
          </form>
          <Box
            mb={10}
            mt={50}
            display={"flex"}
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
            <Button className={Styles.linksNext} onClick={()=>{
              handleNext(exam?.id)
            }}>
              التالي
            </Button>
          </Box>
        </>
      ) : (
        <h1 style={{ textAlign: "center" }}>هذا الدرس غير موجود</h1>
      )}
    </Box>
  );
}
