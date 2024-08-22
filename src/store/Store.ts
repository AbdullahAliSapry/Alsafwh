import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import StudentSlice from "./slices/StudentSlice";
import FeedBackSlice from "./slices/FeedBackSlice";
import CourseSlice from "./slices/CourseSlice";
import SubjectSlice from "./slices/SubjectSlice";
import TeacherSlice from "./slices/TeahcerSlice";
import YearSlice from "./slices/YearSlice";
import LessonSlice from "./slices/LessonSlice";
import CommentSlice from "./slices/CommentSlice";
import NotificationSlice from "./slices/NotificationSlice";
import SubscriptionSlice from "./slices/SubscriptionSlice";
import ExamSlice from "./slices/ExamSlice";
import QuestionSlice from "./slices/QuestionSlice";
import ProblemSlice from "./slices/ProblemSlice";
import PayMentSlice from "./slices/PayMentSlice";
import CoursesFeedBackSlice from "./slices/CoursesFeedBackSlice";
export const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Student: StudentSlice,
    FeedBack: FeedBackSlice,
    Course: CourseSlice,
    Subject: SubjectSlice,
    Teacher: TeacherSlice,
    Year: YearSlice,
    Lesson: LessonSlice,
    Comment: CommentSlice,
    Notification: NotificationSlice,
    Subscription: SubscriptionSlice,
    Exam: ExamSlice,
    Question: QuestionSlice,
    Problem: ProblemSlice,
    Payment: PayMentSlice,
    FeedBackCourses: CoursesFeedBackSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
