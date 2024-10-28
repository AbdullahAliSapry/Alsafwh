import MainLayout from "@layouts/MainLayout";
import HomePage from "@pages/Home/HomePage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./../pages/error/ErrorPage";
import { MantineProvider } from "@mantine/core";
import SigninUser from "@pages/signinUser/SigninUser";
import Login from "@pages/login/Login";
import AboutUs from "@pages/aboutUs/AboutUs";
import SingleCourse from "@pages/singleCourse/SingleCourse";
import AllTeacher from "@pages/allTeacher/AllTeacher";
import StudentPage from "./../pages/studentPage/StudentPage";
import AllCourses from "@pages/allcourses/AllCourses";
import AllMaterials from "@pages/allMaterials/AllMaterials";
import SingleMaterial from "@pages/singleMaterial/SingleMaterial";
import ContactUsPage from "@pages/contact-us/ContactUsPage";
import TeacherPage from "@pages/teacherpage/TeacherPage";
import TeacherCourses from "@pages/teacherpage/components/Teachercourses/TeacherCourses";
import ContentCourse from "./../pages/contentCourse/ContentCourse";
import AllFeedback from "./../pages/allFeedback/AllFeedback";
import TeachersStudent from "./../pages/teachersStudent/TeachersStudent";
import LessonDetailsTeacher from "@pages/lession-details/LessonDetailsTeacher";
import Exam from "@pages/exam/Exam";
import ExamPage from "@pages/examPage/ExamPage";
import ConfirmEmail from "@pages/ConfirmEmail/ConfirmEmail";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";
import AddQuestion from "@pages/addQuestion/AddQuestion";
import FeedbackCourse from "@pages/feedbackCourse/FeedbackCourse";
import ForgetPassword from "@pages/forgetPassword/ForgetPassword";
import ResetPassword from "@pages/resetPassowrd/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import { Payment } from "@pages/payment/Payment";
import SubscriptionsPage from "@pages/subscriptions/SubscriptionsPage";
import Messages from "@pages/message/Messages";
import StatusPayMent from "@pages/statuspayment/StatusPayMent";
import ExamLession from "@pages/contentCourse/ExamLession/ExamLession";
import CoursesStudentSingle from "@pages/coursestudentsinglesubscription/CoursesStudentSingle";
import CoursesForStudentPlans from "@pages/coursesForStudentplans/CoursesForStudentPlans";
import SingleCoursePayMent from "@pages/singlecoursepayment/SingleCoursePayMent";
import ContentLessonTeacher from "@pages/conentlessionteacher/ContentLessonTeacher";
import CoursesToTeacher from "@pages/coursestoteacher/CoursesToTeacher";

export default function AppRouter() {
  const { IsConfirmed, AuthModel } = useSelector(
    (state: RootState) => state.Auth
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/all-teacher",
          element: <AllTeacher />,
        },
        {
          path: "/courses-teacher/:teacherId/:teacherName",
          element: <CoursesToTeacher />,
        },
        {
          path: "/signin",
          element: AuthModel ? <Navigate to={"/"} /> : <SigninUser />,
        },
        {
          path: "/login",
          element: AuthModel ? <Navigate to={"/"} /> : <Login />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/single-course/:id",
          element: <SingleCourse />,
        },
        {
          path: "/all-courses",
          element: <AllCourses />,
        },
        {
          path: "/student-page/:StudentId",
          element: (
            <ProtectedRoute requiredRole="Student">
              <StudentPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/all-materials",
          element: <AllMaterials />,
        },
        {
          path: "/single-material/:id",
          element: <SingleMaterial />,
        },
        {
          path: "/contact-us",
          element: <ContactUsPage />,
        },
        {
          path: "/teacher-profile/:id",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              {" "}
              <TeacherPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/teacher-courses/:teacherId",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              {" "}
              <TeacherCourses />
            </ProtectedRoute>
          ),
        },
        {
          path: "/content-course/:CourseId",
          element: (
            <ProtectedRoute requiredRole="Student">
              <ContentCourse />
            </ProtectedRoute>
          ),
        },
        {
          path: "/all-feedback",
          element: <AllFeedback />,
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/teacher-student",
          element: <TeachersStudent />,
        },
        {
          path: "/lesson-details/:id",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              <LessonDetailsTeacher />
            </ProtectedRoute>
          ),
        },
        {
          path: "/content-lesson-teacher/:LessonId",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              <ContentLessonTeacher />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add-exam/:lessonId",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              <Exam />
            </ProtectedRoute>
          ),
        },
        {
          path: "/exam-page/:id",
          element: <ExamPage />,
        },
        {
          path: "/confirm-email",
          element: !IsConfirmed ? <ConfirmEmail /> : <Navigate to={`/`} />,
        },
        {
          path: "/add-question/:ExamId",
          element: (
            <ProtectedRoute requiredRole="Teacher">
              <AddQuestion />
            </ProtectedRoute>
          ),
        },
        {
          path: "/feedback-course/:CourseId",
          element: <FeedbackCourse />,
        },
        {
          path: "/courses-student/plans-courses/:id",
          element: (
            <ProtectedRoute requiredRole="Student">
              <CoursesForStudentPlans />
            </ProtectedRoute>
          ),
        },
        {
          path: "/courses-student/Individual-courses/:id",
          element: (
            <ProtectedRoute requiredRole="Student">
              <CoursesStudentSingle />
            </ProtectedRoute>
          ),
        },
        {
          path: "/subscriptions",
          element: <SubscriptionsPage />,
        },
        {
          path: "/payment/:id/:Name",
          element: <Payment />,
        },
        {
          path: "/messages/:id",
          element: AuthModel ? <Messages /> : <Navigate to={"/"} />,
        },
        {
          path: "/state",
          element: <StatusPayMent />,
        },
        {
          path: "/exam-lesson/:id",
          element: <ExamLession />,
        },
        {
          path: "/single-course-payment/:CourseId/:StudentId",
          element: <SingleCoursePayMent />,
        },
      ],
    },
  ]);
  //comment
  return (
    <MantineProvider>
      <RouterProvider router={router}></RouterProvider>
    </MantineProvider>
  );
}
