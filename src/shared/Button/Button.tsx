import { Box } from "@mantine/core";
import Styles from "./Button.module.css";
import { Link } from "react-router-dom";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function Button({
  text,
  route,
}: {
  text: string;
  route: string;
}) {

  const {  i18n } = useTranslation();
  return (
    <div>
      {" "}
      <Box
        mb={100}
        mt={40}
        display={"flex"}
        style={{ justifyContent: "center" }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Link to={`${route}`} className={Styles.btnAllCourses}>
          {text}
          {i18n.language === "ar" ? (
            <IconArrowNarrowLeft />
          ) : (
            <IconArrowNarrowRight />
          )}
        </Link>
      </Box>
    </div>
  );
}
