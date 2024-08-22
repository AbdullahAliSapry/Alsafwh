import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "@utilities/interfaces/PublicInterfce";

export interface IStateComment {
  comments: IComment[];
}

const initialState: IStateComment = {
  comments: [],
};

const CommentSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.push(action.payload);
    },
    getAllComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    updateComment: (state, action: PayloadAction<IComment>) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index > -1) {
        state.comments[index] = action.payload;
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { addComment, getAllComments, updateComment, deleteComment } =
  CommentSlice.actions;
export default CommentSlice.reducer;
