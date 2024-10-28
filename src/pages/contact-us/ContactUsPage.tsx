import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconPhone,
} from "@tabler/icons-react";
import classes from "./ContactUsPage.module.css";
import { Link } from "react-router-dom";
import ContactForm from "./components/contactform/ContactForm";
import { useComputedColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { FaYoutube } from "react-icons/fa";
import { useEffect } from "react";

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
const social = [
  {
    icon: IconBrandWhatsapp,
    link: "https://wa.me/201119776787",
    textKey: "contactUs.viaWhatsapp", // Use translation key
    phoneNumber: "01119776787",
  },
  {
    icon: IconPhone,
    link: "tel:201550459604",
    textKey: "contactUs.callPhone", // Use translation key
    phoneNumber: "201550459604",
  },
];

export default function ContactUsPage() {
  const { t } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className={classes.parent}>
      <div className={classes.Handler}></div>
      <div className={classes.mainInfo}>
        <div className={classes.conToSocial}>
          {social.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={
                computedColorScheme === "light"
                  ? classes.StylingSocialLight
                  : classes.StylingSocialDark
              }
              target="_blank"
              rel="noopener noreferrer">
              <div>
                <item.icon />
                <span>{item.phoneNumber}</span>
              </div>
              <span>{t(item.textKey)}</span> {/* Translate the text */}
            </Link>
          ))}
        </div>
        <div
          className={
            computedColorScheme === "light"
              ? classes.ConToLinksLight
              : classes.ConToLinksDark
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
      </div>
      <span className={classes.Seprator}>{t("contactUs.or")}</span>{" "}
      {/* Translate the "Or" text */}
      <div className={classes.FormStyling}>
        <ContactForm />
      </div>
    </div>
  );
}
