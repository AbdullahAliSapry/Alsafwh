import { Box, Container, Text, useComputedColorScheme } from "@mantine/core";
import imageOne from "@assets/Alsafwa/second-section-one.png";
import imageTwo from "@assets/Alsafwa/Premium Vector _ Online business training 3d isometric vector concept.png";
import imageThree from "@assets/Alsafwa/second-section-three.png";
import classes from "./SecondeSection.module.css";
import TitleSection from "@shared/titlesction/TitleSection";
import { useTranslation } from "react-i18next";

export default function SecondeSection() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { t, i18n } = useTranslation();
  
  return (
    <>
      <Box mb={50} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <TitleSection title={t("SecondeSection.title")} />
      </Box>
      <Box
        mb={100}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Container mx={0} p={0}>
          <Box className={classes.styleAllCard}>
            <Box
              className={
                computedColorScheme === "light"
                  ? classes.styleCardLight
                  : classes.styleCardDark
              }>
              <Box className={classes.positionImage}>
                <img src={imageOne} width={"150px"} height={"150px"} />
              </Box>

              <Box pt={100} ta={"center"}>
                <Text mb={8} mt={3} fw={700} fz={20} c={"#003EDD"}>
                  {t("SecondeSection.previousExams")}
                </Text>
                <Text
                  className={
                    computedColorScheme === "light"
                      ? classes.descLight
                      : classes.descDark
                  }
                  fz={11}>
                  {t("SecondeSection.previousExamsDesc")}
                </Text>
              </Box>
            </Box>

            <Box
              className={
                computedColorScheme === "light"
                  ? classes.styleCardLight
                  : classes.styleCardDark
              }>
              <Box className={classes.positionImage}>
                <img src={imageTwo} width={"150px"} height={"150px"} />
              </Box>

              <Box pt={100} ta={"center"}>
                <Text mb={8} mt={3} fw={700} fz={20} c={"#003EDD"}>
                  {t("SecondeSection.comprehensiveLibrary")}
                </Text>
                <Text
                  className={
                    computedColorScheme === "light"
                      ? classes.descLight
                      : classes.descDark
                  }
                  fz={11}>
                  {t("SecondeSection.comprehensiveLibraryDesc")}
                </Text>
              </Box>
            </Box>

            <Box
              className={
                computedColorScheme === "light"
                  ? classes.styleCardLight
                  : classes.styleCardDark
              }>
              <Box className={classes.positionImage}>
                <img src={imageThree} width={"150px"} height={"150px"} />
              </Box>

              <Box pt={100} ta={"center"}>
                <Text mb={8} mt={3} fw={700} fz={20} c={"#003EDD"}>
                  {t("SecondeSection.secure")}
                </Text>
                <Text
                  className={
                    computedColorScheme === "light"
                      ? classes.descLight
                      : classes.descDark
                  }
                  fz={11}>
                  {t("SecondeSection.secureDesc")}
                </Text>
              </Box>
            </Box>

            <Box
              className={
                computedColorScheme === "light"
                  ? classes.styleCardLight
                  : classes.styleCardDark
              }>
              <Box className={classes.positionImage}>
                <img src={imageThree} width={"150px"} height={"150px"} />
              </Box>

              <Box pt={100} ta={"center"}>
                <Text mb={8} mt={3} fw={700} fz={20} c={"#003EDD"}>
                  {t("SecondeSection.technicalSupport")}
                </Text>
                <Text
                  className={
                    computedColorScheme === "light"
                      ? classes.descLight
                      : classes.descDark
                  }
                  fz={11}>
                  {t("SecondeSection.technicalSupportDesc")}
                </Text>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
