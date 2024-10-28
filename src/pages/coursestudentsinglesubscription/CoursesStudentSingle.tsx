import CoursesForStudent from "@shared/coursesForStudent/CoursesForStudent";
import {GetCoursesToStudentSingleApi } from "@store/api/StudentApi";
import { AppDispatch, RootState } from "@store/Store";
import { IStudent } from "@utilities/interfaces/StudentInterfce";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CoursesStudentSingle() {
      const dispatch = useDispatch<AppDispatch>();

      const { studentCourseSingle, student } = useSelector(
        (state: RootState) => state.Student
      );
      const { t } = useTranslation();

      const { id } = useParams();
      useEffect(() => {
        if (id != student?.user.id) {
          toast.error(t("coursesForStudent.userNotFound"));
          return;
        }
        if (id !== null && id) {
          dispatch(GetCoursesToStudentSingleApi(id));
        }
      }, [id, dispatch, student, t]);
        
  return (
    <div>
      <CoursesForStudent
        studentCourses={studentCourseSingle}
        student={student as IStudent}
        isSingle={true}
      />
    </div>
  );
}
