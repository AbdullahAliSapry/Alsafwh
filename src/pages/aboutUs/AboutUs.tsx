import { Box, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./AboutUs.module.css";
import logo from "@assets/Alsafwa/11.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Box
        display={"grid"}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        mx={20}
        style={{ justifyContent: "center" }}
        c={computedColorScheme === "light" ? "black" : "white"}>
        <Box mt={50}>
          <Text fz={20} fw={700} c={"#003EDD"}>
            {t("aboutUs.whoWeAre")}
          </Text>
          <Text mt={10} mr={20}>
            {t("aboutUs.description1")}
          </Text>
          <Text mt={20} mr={20}>
            {t("aboutUs.description2")}
          </Text>
          <Text mt={20} mr={20}>
            {t("aboutUs.description3")}
          </Text>
        </Box>

        <Box mt={30}>
          <Text fz={20} fw={700} c={"#003EDD"}>
            {t("aboutUs.ourTeachers")}
          </Text>
          <Text mt={10} mr={20}>
            {t("aboutUs.teachersDescription1")}
          </Text>
          <Text mt={20} mr={20}>
            {t("aboutUs.teachersDescription2")}
          </Text>
        </Box>

        <Box mt={30}>
          <Text fz={20} fw={700} c={"#003EDD"}>
            {t("aboutUs.ourMission")}
          </Text>
          <Text mt={20} mr={20}>
            {t("aboutUs.missionDescription")}
          </Text>
        </Box>

        <Box className={classes.endSection}>
          <Box>
            <Text fz={20} fw={700} c={"#003EDD"}>
              {t("aboutUs.ourVision")}
            </Text>
            <Text mt={20} mr={20}>
              {t("aboutUs.visionDescription")}
            </Text>
          </Box>

          <Box className={classes.decoration}>
            <img
              src={logo}
              alt=""
              className={classes.imageLogo}
              width={"500px"}
              height={"275px"}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
