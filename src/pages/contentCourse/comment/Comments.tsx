/* eslint-disable react-hooks/exhaustive-deps */
import CommentList from "./ListComments";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import AddComments from "./AddComments";
import { GetAllCommentsApi } from "@store/api/CommentApi";
import { useEffect } from "react";
import { Text } from "@mantine/core";
import classes from "./../ContentCourse.module.css";
export default function Comments({ LessonId }: { LessonId: string }) {
  const { comments } = useSelector((state: RootState) => state.Comment);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!LessonId) return;
    dispatch(GetAllCommentsApi(LessonId));
  }, [dispatch, LessonId]);
  return (
    <>
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <Text className={classes.StyleNotFound}>لا توجد تعليقات حاليا</Text>
      )}
      <AddComments LessonId={LessonId} />
    </>
  );
}
