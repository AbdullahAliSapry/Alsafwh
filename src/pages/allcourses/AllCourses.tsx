import styles from "./AllCourses.module.css";
import { motion } from "framer-motion";
import CoursesHeader from "./components/coursesHeader/CoursesHeader";
import AllCoursesBody from "./components/allCoursesbody/AllCoursesBody";
import PaginationCom from "@shared/Pagination/PaginationCom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { GetAllCoursesApi, GetCountCoursesApi } from "@store/api/CourseApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Take = 6;
const { parent, NotFoundStyle } = styles;

export default function AllCourses() {
  const { t } = useTranslation(); // Initialize translation
  const dispatch = useDispatch<AppDispatch>();
  const { courses, count, coursesFilter, isFiltered } = useSelector(
    (state: RootState) => state.Course
  );
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(initialPage);

  useEffect(() => {
    dispatch(GetAllCoursesApi(page, Take));
  }, [dispatch, page]);

  useEffect(() => {
    if (count > 0) {
      setPage((prevPage) =>
        Math.max(1, Math.min(prevPage, Math.ceil(count / Take)))
      );
    }
  }, [count]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(page));
    navigate({ search: searchParams.toString() });
  }, [page, navigate, location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(GetCountCoursesApi());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={parent}>
        <CoursesHeader />
        {(courses.length > 0 && !isFiltered) ||
        (isFiltered && coursesFilter.length > 0) ? (
          <>
            <AllCoursesBody data={isFiltered ? coursesFilter : courses} />
            {!isFiltered && (
              <PaginationCom
                length={count}
                Take={Take}
                page={page}
                SetPage={setPage}
              />
            )}
          </>
        ) : (
          <>
            {isFiltered ? (
              <h1 className={NotFoundStyle}>{t("courses.notFoundFiltered")}</h1>
            ) : (
              <h1 className={NotFoundStyle}>{t("courses.notFound")}</h1>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
