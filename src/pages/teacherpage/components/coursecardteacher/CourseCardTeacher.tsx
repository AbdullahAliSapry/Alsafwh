import Styles from "./CourseCardTeacher.module.css";
const {
  card,
  teacherImage,
  teacherInfo,
  buttons,
  buttonDetails,
  buttonRegister,
  StyleInfoCourse,
  discussionImage,
  StyleDescription,
} = Styles;
import teacherImg from "@assets/Alsafwa/teacheravatart.png";
import CourseImg from "@assets/Alsafwa/avatarImgCourses.png";
import { Box } from "@mantine/core";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { Link } from "react-router-dom";
import useImageHandler from "@utilities/useImageHandler";

export default function CourseCardTeacher({ course }: { course: ICourse }) {
  const [imageSrc, handleTeacherImageError] = useImageHandler(
    course.teacher.user.fileUploads.url,
    teacherImg
  );

  const [ImgCOurse, handleCourseImageError] = useImageHandler(
    course.imgUrl,
    CourseImg
  );

  return (
    <Box c={"black"} className={card}>
      <div className={discussionImage}>
        <img
          src={ImgCOurse}
          alt="Group Discussion"
          onError={handleCourseImageError}
        />
      </div>
      <div className={teacherInfo}>
        <img
          className={teacherImage}
          src={imageSrc}
          alt="Teacher"
          onError={handleTeacherImageError}
        />
        <span>
          {course?.teacher.user.firstName + " " + course.teacher.user.lastName}
        </span>
        <p>معلم مادة الجيولوجيا</p>
      </div>
      <div className={StyleInfoCourse}>
        <p>{course.title}</p>
        <p>({course?.year?.name})</p>
      </div>
      <p className={StyleDescription}>
        لمن يريد أن يتقن مادة الفلسفة
        <br />
        ويتفوق بها مع أشطر الأساتذة على مستوى مصر
      </p>
      <div className={buttons}>
        <Link to={`/single-course/${course.id}`} className={buttonDetails}>
          تفاصيل
        </Link>
        <Link to={`/lesson-details/${course.id}`} className={buttonRegister}>
          الدروس
        </Link>
      </div>
    </Box>
  );
}
