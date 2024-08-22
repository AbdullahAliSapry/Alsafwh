import { Box, Text, useComputedColorScheme } from "@mantine/core";

import styles from "./TitleSection.module.css";
import { useTranslation } from "react-i18next";

const {
  titleLight,
  parent,
  titleDark,
  titleStyleEn,
  titleStyleAr,
  styleBackLight,
  styleBackDark,
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
          computedColorScheme == "light" ? styleBackLight : styleBackDark
        }`}>
        <Text
          className={`${i18n.language === "ar" ? titleStyleAr : titleStyleEn} ${
            computedColorScheme == "light" ? titleLight : titleDark
          }`}>
          {title}
        </Text>
      </Box>
    </div>
  );
}
