import { Box, Grid, Group, Text } from "@mantine/core";
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
          <Grid styles={{ inner: { alignItems: "center" } }}>
            <Grid.Col
              className={classes.container}
              span={{ base: 12, md: 6, lg: 6 }}>
              <div>
                <Text className={classes.font}>
                  <span style={{ color: "#003EDD" }}>
                    {t("header.startHeader")}
                  </span>
                  {t("header.headerTitle")}
                </Text>
                <br />
                <Text fw={400} fz={20}>
                  {t("header.SubTitle")}
                </Text>

                <Group className={classes.gap} mt={15}>
                  {!AuthModel && (
                    <Link to={"/login"} className={classes.linkOne}>
                      {t("header.ButtonJoin")}
                    </Link>
                  )}

                  <Link to={"/about-us"} className={classes.linkTwo}>
                    {t("header.ButtonHider")}
                  </Link>
                </Group>
              </div>
            </Grid.Col>

            <Grid.Col
              className={classes.container}
              span={{ base: 12, md: 6, lg: 6 }}>
              <img src={image} className={classes.image} />
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
