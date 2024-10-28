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
  stylePrice,
  StyleDescription,
  crdDark,
} = Styles;
import teacherImg from "@assets/Alsafwa/teacheravatart.png";
import CourseImg from "@assets/Alsafwa/avatarImgCourses.png";
import { Box, useComputedColorScheme } from "@mantine/core";
import { ICourse } from "@utilities/interfaces/CourseInterface";
import { Link } from "react-router-dom";
import useImageHandler from "@utilities/useImageHandler";
const colors = ["#1ABC9C", "#FF81AE", "#C6D7FF", "#FF725E", "#7654B6"];

export default function CourseCardTeacher({ course }: { course: ICourse }) {
  const [imageSrc, handleTeacherImageError] = useImageHandler(
    course.teacher.user.fileUploads.url,
    teacherImg
  );

  const [ImgCOurse, handleCourseImageError] = useImageHandler(
    course.imgUrl,
    CourseImg
  );
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
    function getRandomColor() {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
    const randomColor = getRandomColor();

  return (
    <Box
      c={"black"}
      className={`${card} ${computedColorScheme === "dark" ? crdDark : ""}`}>
      <div className={`${discussionImage}`} style={{ background: randomColor }}>
        <div className={stylePrice}>
          <span>{course.price}</span>
          <span>جم</span>
        </div>
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
        <p> معلم {course.subject?.name}</p>
      </div>
      <div className={StyleInfoCourse}>
        <p>({course?.year?.name})</p>
      </div>
      <p className={StyleDescription}>{course.title}</p>
      <div className={buttons}>
        <Link
          to={`/single-course/${course.id}`}
          className={buttonDetails}
          style={{ background: randomColor }}>
          تفاصيل
        </Link>
        <Link to={`/lesson-details/${course.id}`} className={buttonRegister}>
          الدروس
        </Link>
      </div>
    </Box>
  );
}
