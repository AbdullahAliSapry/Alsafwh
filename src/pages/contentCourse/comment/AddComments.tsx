import classes from "../ContentCourse.module.css";
import { Box, Button } from "@mantine/core";
import { useFormik } from "formik";
import { CommentSchema } from "@schemas/PublicSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { AddCommentApi } from "@store/api/CommentApi";
import { IAddComment } from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export default function AddComments({ LessonId }: { LessonId: string }) {
  const initialValues: { Text: string } = {
    Text: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const { student } = useSelector((state: RootState) => state.Student);
  const { teacher } = useSelector((state: RootState) => state.Teacher);

  const formik = useFormik({
    initialValues,
    validationSchema: CommentSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const user = student?.user || teacher?.user; 
     if (!user) {
        toast.error("من فضلك سجل الدخول اولا ");
        return;
      }

      dispatch(
        AddCommentApi(
          {
            likes: 0,
            text: values.Text,
            userId: AuthModel?.userId,
            lessionId: LessonId,
          } as IAddComment,
          user 
        )
      );
      formik.resetForm();
    },
  });

  return (
    <div>
      <Box
        display={"flex"}
        style={{ alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <Box
          display={"flex"}
          bg={"yellow"}
          style={{
            borderRadius: "100px",
            justifyContent: "center",
            overflow: "hidden",
          }}>
          <img
            src={
              student?.user?.fileUploads?.url || teacher?.user?.fileUploads?.url
            } 
            width={"50px"}
            height={"50px"}
          />
        </Box>
        <form onSubmit={formik.handleSubmit} className={classes.StyleForm}>
          <input
            className={classes.inputCommentCourse}
            value={formik.values.Text}
            onChange={formik.handleChange}
            name="Text"
            onBlur={formik.handleBlur}
            placeholder="اضافة تعليق..."
          />
          <Button className={classes.btnSend} type="submit">
            ارسال
          </Button>
        </form>
      </Box>
    </div>
  );
}
