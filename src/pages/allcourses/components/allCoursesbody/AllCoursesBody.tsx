import { Box } from "@mantine/core";
import CourseCard from "../coursecard/CourseCard";
import Styles from "./AllCoursesBody.module.css";
import { ICourse } from "@utilities/interfaces/CourseInterface";

const { parent } = Styles;
export default function AllCoursesBody({ data }: { data: ICourse[] }) {
  return (
    <Box className={parent}>
      {data.map((course) => {
        return <CourseCard course={course} key={course.id} />;
      })}
    </Box>
  );
}
