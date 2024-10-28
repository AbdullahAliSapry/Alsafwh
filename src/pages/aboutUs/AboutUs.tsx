import { Box, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./AboutUs.module.css";
import logo from "@assets/Alsafwa/11.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Box
        display={"grid"}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        mx={20}
        className={classes.parent}
        style={{ justifyContent: "center" }}
        c={computedColorScheme === "light" ? "black" : "white"}>
        {/* Who We Are Section */}
        <div className={classes.ContainerData1}>
          <Box mt={50}>
            <Text fz={20} fw={700} c={"#003EDD"} className={classes.title}>
              {t("aboutUs.whoWeAre")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.description1")}
            </Text>
          </Box>

          {/* What We Offer Section */}
          <Box mt={30}>
            <Text fz={20} fw={700} c={"#003EDD"} className={classes.title}>
              {t("aboutUs.whatWeOffer")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.description2")}
            </Text>
          </Box>

          {/* Our Vision Section */}
          <Box mt={30}>
            <Text fz={20} fw={700} c={"#003EDD"} className={classes.title}>
              {t("aboutUs.ourVision")}
            </Text>
            <Text mt={20} mr={20}>
              {t("aboutUs.visionDescription")}
            </Text>
          </Box>
        </div>
        <div className={classes.ContainerData}>
          <Box mt={30}>
            <Text fz={20} fw={700} c={"#003EDD"} className={classes.title}>
              {t("aboutUs.privacyPolicy")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy1")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy2")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy3")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy4")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy5")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy6")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy7")}
            </Text>
            <Text mt={10} mr={20}>
              {t("aboutUs.privacyPolicyDetails.policy8")}
            </Text>
          </Box>

          {/* Logo and End Section */}
          <Box className={classes.endSection}>
            <Box>
              <img
                src={logo}
                alt=""
                className={classes.imageLogo}
                width={"500px"}
                height={"275px"}
              />
            </Box>
          </Box>
        </div>
      </Box>
    </motion.div>
  );
}
