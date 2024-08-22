import classes from "./Footer.module.css";
import phone from "@assets/Alsafwa/cash.png";
import paymop from "@assets/Alsafwa/paymop.png";
import { Box } from "@mantine/core";
import { Link } from "react-router-dom";
import imgLogo from "@assets/Alsafwa/12.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <Box bg={"rgb(40,54,70)"}>
      <Box
        className={classes.footer}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Box
          display={"grid"}
          style={{
            justifyContent: "center",
            gap: "-10px",
            paddingTop: "10px",
          }}>
          <img src={imgLogo} height={"150px"} className={classes.logo} />
          <Box
            display={"flex"}
            style={{ alignItems: "center" }}
            className={classes.ImgCon}>
            <img src={paymop} alt={t("Footer.paymopAlt")} />
            <img src={phone} alt={t("Footer.phoneAlt")} />
          </Box>
        </Box>

        <Box ta={"center"} mt={40} className={classes.partMore}>
          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              paddingRight: "0px",
            }}>
            <p className={classes.titleInFooter}>{t("Footer.more")}</p>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.about")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.team")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.contact")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.helpCenter")}
              </Link>
            </li>
          </ul>
        </Box>

        <Box ta={"center"} mt={40}>
          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              paddingRight: "0px",
            }}>
            <p className={classes.titleInFooter}>{t("Footer.terms")}</p>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.termsOfUse")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.cookiePolicy")}
              </Link>
            </li>
          </ul>
        </Box>

        <Box ta={"center"} mt={40}>
          <ul
            style={{
              listStyle: "none",
              textAlign: "center",
              paddingRight: "0px",
            }}>
            <p className={classes.titleInFooter}>{t("Footer.language")}</p>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.arabic")}
              </Link>
            </li>
            <li>
              <Link to={"/"} className={classes.linkFooter}>
                {t("Footer.english")}
              </Link>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
