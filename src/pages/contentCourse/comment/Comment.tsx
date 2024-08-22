import { Box, Button, useComputedColorScheme } from "@mantine/core";
import classes from "./../ContentCourse.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { IComment } from "@utilities/interfaces/PublicInterfce";

import ModelUpdate from "./ModelUpdate";
import { DeleteCommentApi } from "@store/api/CommentApi";

export default function Comment({ comment }: { comment: IComment }) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleted = () => {
    dispatch(DeleteCommentApi(comment.id));
  };
  return (
    <div>
      <p>{comment.text}</p>
      {AuthModel?.userId === comment?.userId ? (
        <Box mt={10} mr={20} display={"flex"} style={{ gap: "2rem" }}>
          <ModelUpdate comment={comment} />
          <Button
            fz={13}
            fw={500}
            className={classes.deleteBtn}
            onClick={handleDeleted}
            c={computedColorScheme == "light" ? "rgba(0, 0, 0, 0.6)" : "white"}>
            حذف
          </Button>
        </Box>
      ) : AuthModel && AuthModel?.roles.includes("Teacher") ? (
        <Button
          fz={13}
          fw={500}
          className={classes.deleteBtn}
          onClick={handleDeleted}
          c={computedColorScheme == "light" ? "rgba(0, 0, 0, 0.6)" : "white"}>
          حذف
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
