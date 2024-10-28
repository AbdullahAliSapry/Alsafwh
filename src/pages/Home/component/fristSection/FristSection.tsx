import { Box, Text } from "@mantine/core";
import image from "../../../../assets/Alsafwa/firstImage.png";
import classes from "./FristSection.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";
import { useTranslation } from "react-i18next";

export default function FristSection() {
  const { AuthModel } = useSelector((state: RootState) => state.Auth);

  const { t, i18n } = useTranslation();
  return (
    <div>
      <Box p={20} mx={50} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Box className={classes.styleTop}>
          <Box className={classes.containerFirstSection}>
            <div className={classes.subParent}>
              <Text className={classes.font}>
                <span style={{ color: "#003EDD" }}>
                  {t("header.startHeader")}
                </span>
                {t("header.headerTitle")}
              </Text>
              <br />

              <Text
                fw={400}
                className={`${classes.typewriter} ${
                  i18n.language == "en" ? classes.en : ""
                }`}>
                {t("header.SubTitle")}
              </Text>
              <div className={classes.containerBtn}>
                {!AuthModel && (
                  <Link to={"/login"} className={classes.linkOne}>
                    {t("header.ButtonJoin")}
                  </Link>
                )}

                <Link to={"/about-us"} className={classes.linkTwo}>
                  {t("header.ButtonHider")}
                </Link>
              </div>
            </div>

            <img src={image} className={classes.image} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
