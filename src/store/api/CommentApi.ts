/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  addComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "@store/slices/CommentSlice";
import { Api } from "@utilities/Api";
import {
  IAddComment,
  IComment,
  IUser,
} from "@utilities/interfaces/PublicInterfce";
import { toast } from "react-toastify";

export const AddCommentApi = (comment: IAddComment, user: IUser) => {
  return async (dispatch: Dispatch<PayloadAction<IComment>>) => {
    try {
      const { data } = await Api.post(`Comment/Add`, comment);
      const neWcomment: IComment = {
        id: data.statusMessage as string,
        text: comment.text,
        likes: 0,
        userId: comment.userId,
        lessionId: comment.lessionId,
        user: user,
        createAt: new Date().toISOString(),
      };
      dispatch(addComment(neWcomment));
      toast.success("تم اضافه التعليق بنجاح");
    } catch (error: any) {
      console.log(error?.response?.data);

      toast.error(error.response.data.message || "حدث خطا اثناء اضافه الكوبون");
    }
  };
};

export const GetAllCommentsApi = (lessonId: string) => {
  return async (dispatch: Dispatch<PayloadAction<IComment[]>>) => {
    try {
      const { data } = await Api.get(`Comment/getAll/${lessonId}`);
      dispatch(getAllComments(data));
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  };
};

export const UpdateCommentApi = (comment: IComment) => {
  return async (dispatch: Dispatch<PayloadAction<IComment>>) => {
    try {
      await Api.patch(`Comment/edit`, {
        id: comment.id,
        text: comment.text,
      });
      dispatch(updateComment(comment));
      toast.success("تم تحديث التعليق بنجاح");
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};

export const DeleteCommentApi = (commentId: string) => {
  return async (dispatch: Dispatch<PayloadAction<string>>) => {
    try {
      await Api.delete(`Comment/delete/${commentId}`);
      dispatch(deleteComment(commentId));
      toast.success("تم حذف التعليق بنجاح");
    } catch (error: any) {
      console.log(error?.response);
    }
  };
};

