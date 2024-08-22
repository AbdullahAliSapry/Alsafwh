import { Box } from "@mantine/core";
import styles from "./AllLessons.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { ILesson } from "@utilities/interfaces/PublicInterfce";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch} from "react-redux";
import { AppDispatch} from "@store/Store";
import { MakePublishedApi } from "@store/api/ExamApi";
import { MdPublishedWithChanges } from "react-icons/md";

export default function AllLessons({ lessons }: { lessons: ILesson[] }) {
  const dispatch = useDispatch<AppDispatch>();

  const handlePublish = (id: string) => {
    dispatch(MakePublishedApi(id));
  };



  return (
    <Box mt={50} className={styles.parent}>
      {lessons.map((lesson) => (
        <Box mb={10} key={lesson.id} className={styles.lesson}>
          <h4 className={styles.title}>{lesson.title}</h4>
          {lesson.containQuize ? (
            <>
              {" "}
              <button>
                يوجد امتحان
                <FaCircleCheck className={styles.icon} />
              </button>
              {lesson.containQuize && lesson.quize?.isPubliched === false ? (
                <>
                  {" "}
                  <button className={styles.activeButton}>
                    <CiCirclePlus className={styles.icon} />
                    <Link
                      className={styles.LinkStyle}
                      to={`/add-question/${lesson.quize.id}`}>
                      {" "}
                      اضافه الاسئله
                    </Link>
                  </button>{" "}
                  <button
                    className={styles.activeButton}
                    onClick={() => handlePublish(lesson.quize?.id || "")}>
                    <MdPublishedWithChanges className={styles.icon} />
                    نشر الامتحان
                  </button>
                </>
              ) : (
                <button className={styles.activeButton}>
                  <FaCircleCheck className={styles.icon} />
                  تم نشر الامتحان
                </button>
              )}
            </>
          ) : (
            <>
              {" "}
              <button className={styles.activeButton}>
                <CiCirclePlus className={styles.icon} />
                <Link
                  className={styles.LinkStyle}
                  to={`/add-exam/${lesson.id}`}>
                  {" "}
                  اضافه امتحان
                </Link>
              </button>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
