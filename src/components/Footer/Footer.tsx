import classes from "./Footer.module.css";
import phone from "@assets/Alsafwa/cash.png";
import paymop from "@assets/Alsafwa/paymop.png";
import { Box, useComputedColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import imgLogo from "@assets/Alsafwa/12.png";
import { useTranslation } from "react-i18next";
import { FaYoutube } from "react-icons/fa6";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

const links = [
  {
    icon: FaYoutube,
    link: "https://www.youtube.com/@minasatalsafwa",
  },
  {
    icon: IconBrandFacebook,
    link: "https://www.facebook.com/profile.php?id=61560580450930",
  },
  {
    icon: IconBrandInstagram,
    link: "https://www.instagram.com/alsafwacompany24",
  },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
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
              <Link to={"/about-us"} className={classes.linkFooter}>
                {t("Footer.about")}
              </Link>
            </li>
            <li>
              <Link
                to={"https://www.facebook.com/profile.php?id=61560580450930"}
                target="_blank"
                className={classes.linkFooter}>
                {t("Footer.team")}
              </Link>
            </li>
            <li>
              <Link to={"/contact-us"} className={classes.linkFooter}>
                {t("Footer.contact")}
              </Link>
            </li>
            <li>
              <Link to={"/contact-us"} className={classes.linkFooter}>
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
        <Box ta={"center"} mt={40}>
          <div
            className={
              computedColorScheme === "light"
                ? classes.ConToLinksLight
                : classes.ConToLinksLight
            }>
            {links.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                target="_blank"
                rel="noopener noreferrer">
                <div>
                  <item.icon />
                </div>
              </Link>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
