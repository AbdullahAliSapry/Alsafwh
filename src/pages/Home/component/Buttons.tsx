import { Box, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const pages = [
  {
    path: "/all-teacher",
  },
  {
    path: "/signin",
  },
  {
    path: "/login",
  },
  {
    path: "/about-us",
  },
  {
    path: "/single-course",
  },
  {
    path: "/all-courses",
  },
  {
    path: "/student-page",
  },
  {
    path: "/all-materials",
  },
  {
    path: "/single-material",
  },
  {
    path: "/contact-us",
  },
  {
    path: "/teacher-profile",
  },
  {
    path: "/teacher-courses",
  },
  {
    path: "/content-course",
  },
  {
    path: "/all-feedback",
  },
  {
    path: "/reset-password",
  },
  {
    path: "/teacher-student",
  },
  {
    path: "/lesson-details/:id",
  },
  {
    path: "/add-exam/:lessonId",
  },
  {
    path: "/exam-page",
  },
  {
    path: "/add-question",
  },
  {
    path: "/feedback-course",
  },
  {
    path: "/courses-student",
  },
];

export default function Buttons() {
  return (
    <Box
      px={20}
      my={50}
      display={"flex"}
      style={{ flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
    >
      {pages.map((item, index) => (
        <Button key={index}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={item.path}
          >
            {index + 1} <br /> {item.path}{" "}
          </Link>
        </Button>
      ))}
    </Box>
  );
}
