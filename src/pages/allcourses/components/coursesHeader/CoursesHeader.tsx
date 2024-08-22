import { Link } from "react-router-dom";
import Style from "./CoursesHeader.module.css";
import Search from "../Serach/Search";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";
import { useTranslation } from "react-i18next";

const {
  header,
  InfoSection,
  styleButton,
  SearchStyle,
  WelcomStyle,
} = Style;

export default function CoursesHeader() {
  const { t, i18n } = useTranslation(); // Initialize translation
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const { student } = useSelector((state: RootState) => state.Student);

  return (
    <div className={header} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div
        className={`${InfoSection}`}
>
        <h2>{t("coursesHeader.heading")}</h2>
        <span>{t("coursesHeader.subheading")}</span>
        {AuthModel ? (
          <span className={WelcomStyle}>
            {t("coursesHeader.welcome", {
              firstName: student?.user.firstName,
              lastName: student?.user.lastName,
            })}
          </span>
        ) : (
          <button className={styleButton}>
            <Link to={"/login"}>{t("coursesHeader.joinNow")}</Link>
          </button>
        )}
      </div>
      <div className={SearchStyle}>
        <Search />
      </div>
    </div>
  );
}
