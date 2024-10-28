import { Box, Text, useComputedColorScheme } from "@mantine/core";

import styles from "./TitleSection.module.css";
import { useTranslation } from "react-i18next";

const {
  parent,
  titleStyleEn,
  styleBackLightEn,
  titleStyleAr,
  styleBackLight,
  styleBackDark,
  styleBackDarkEn,
} = styles;
export default function TitleSection({ title }: { title: string }) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { i18n } = useTranslation();
  return (
    <div className={parent}>
      <Box
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`${
          computedColorScheme == "light" && i18n.language === "ar"
            ? styleBackLight
            : computedColorScheme == "dark" && i18n.language === "ar"
            ? styleBackDark
            : computedColorScheme == "light" && i18n.language === "en"
            ? styleBackLightEn
            : styleBackDarkEn
        }`}>
        <Text
          className={`${i18n.language === "ar" ? titleStyleAr : titleStyleEn}`}>
          {title}
        </Text>
      </Box>
    </div>
  );
}
