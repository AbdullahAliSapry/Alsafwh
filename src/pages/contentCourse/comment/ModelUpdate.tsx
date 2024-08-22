import { Modal, Button, useComputedColorScheme } from "@mantine/core";
import { IComment } from "@utilities/interfaces/PublicInterfce";
import classes from "./../ContentCourse.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { useFormik } from "formik";
import { CommentSchema } from "@schemas/PublicSchema";
import { UpdateCommentApi } from "@store/api/CommentApi";
export default function ModelUpdate({ comment }: { comment: IComment }) {
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: { Text: string } = {
    Text: comment.text,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: CommentSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("enter");
      console.log(comment);
      const updatedComment: IComment = { ...comment, text: values.Text };
      dispatch(UpdateCommentApi(updatedComment));
      setSlowTransitionOpened(true);
    },
  });
  return (
    <>
      <Modal
        opened={slowTransitionOpened}
        onClose={() => setSlowTransitionOpened(false)}
        title="تعديل التعليق الخاص بك"
        transitionProps={{ transition: "rotate-left" }}
        centered>
        <form
          className={classes.StyleFormEdit}
          noValidate
          onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="Text"
            value={formik.values.Text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classes.inputCommentCourse}
          />
          <Button className={classes.btnSend} type="submit">
            حفظ
          </Button>
        </form>
      </Modal>

      <Button
        fz={13}
        fw={500}
        className={classes.deleteBtn}
        onClick={() => setSlowTransitionOpened(true)}
        c={computedColorScheme == "light" ? "rgba(0, 0, 0, 0.6)" : "white"}>
        تعديل
      </Button>
    </>
  );
}
