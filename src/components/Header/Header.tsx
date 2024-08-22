import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Select,
  useDisclosure,
  IconChevronDown,
  IconLanguage,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  IconSun,
  IconMoon,
  cx,
  Link,
  classes,
} from "@utilities/imports/ImportsHeader";
import { NavLink } from "react-router-dom";
import MainLogo from "@assets/Alsafwa/11.png";
import ImgPerson from "@assets/Alsafwa/person.png";
import MenuCom from "@shared/menu/MenuCom";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface obj {
  title: string;
  path: string;
}

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { t, i18n } = useTranslation();

  const initialLang = localStorage.getItem("i18nextLng") || "ar";
  const [lang, setLang] = useState(initialLang);

  const Links: obj[] = [
    { title: t("NavBar.home"), path: "/" },
    { title: t("NavBar.courses"), path: "/all-courses" },
    { title: t("NavBar.contact"), path: "/contact-us" },
    { title: t("NavBar.About"), path: "/about-us" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  useEffect(() => {
    changeLanguage(lang);
  }, []);

  const { AuthModel } = useSelector((state: RootState) => state.Auth);

  return (
    <div>
      <Box
        pb={28}
        pt={15}
        w={"100%"}
        className={
          computedColorScheme == "light"
            ? classes.decorationLight
            : classes.decorationDark
        }
        dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <header
          className={classes.header}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          <Group
            justify="space-evenly"
            className={classes.reponsHeader}
            style={{ justifyItems: "center" }}
            h="100%">
            <div className={classes.StyleImg}>
              <Link to="/">
                <img
                  src={MainLogo}
                  className={classes.logoImg}
                  style={{ marginTop: "0", objectFit: "contain" }}
                  width={"135px"}
                  height={"70px"}
                />
              </Link>
            </div>

            <Group
              h="100%"
              className={classes.itemHeader}
              ml={-10}
              visibleFrom="md">
              {Links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={`LinkActiveInMain ${classes.link}`}>
                  {link.title}
                </NavLink>
              ))}
            </Group>

            <Group visibleFrom="md">
              <Box style={{ marginRight: "-20px" }}>
                <Select
                  styles={{
                    section: {},
                    input: {
                      border: "1px solid rgb(0, 0, 0 / 0.3)",
                      borderRadius: "20px",
                      paddingRight: "40px",
                      paddingLeft: "30px",
                      fontSize: "18px",
                    },
                    wrapper: {
                      width: "60%",
                    },
                    dropdown: {
                      zIndex: 10000,
                    },
                  }}
                  data={["العربية", "English"]}
                  onChange={(value) => {
                    const newLang = value === "العربية" ? "ar" : "en";
                    setLang(newLang);
                    changeLanguage(newLang);
                  }}
                  value={lang === "ar" ? "العربية" : "English"}
                  leftSection={<IconLanguage color="rgb(34,139,230)" />}
                  rightSection={<IconChevronDown color="rgb(34,139,230)" />}
                  allowDeselect={false}
                />
              </Box>
              <div className={classes.StyleMenuSection}>
                <Box style={{ marginRight: "-15px" }}>
                  <Box>
                    <ActionIcon
                      onClick={() =>
                        setColorScheme(
                          computedColorScheme === "light" ? "dark" : "light"
                        )
                      }
                      variant="default"
                      size="xl"
                      aria-label="Toggle color scheme">
                      <IconSun
                        className={cx(classes.icon, classes.light)}
                        stroke={1.5}
                      />
                      <IconMoon
                        className={cx(classes.icon, classes.dark)}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Box>
                </Box>
                <Box>{AuthModel && <MenuCom img={ImgPerson} />}</Box>
              </div>
            </Group>
            <Box hiddenFrom="md" className={classes.StyleBurger}>
              <Box>{AuthModel && <MenuCom img={ImgPerson} />}</Box>
              <Burger opened={drawerOpened} onClick={toggleDrawer} />
            </Box>
          </Group>
        </header>
        <Drawer
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="md"
          zIndex={1000000}
          style={{ direction: "rtl" }}>
          <ScrollArea
            h={`calc(100vh - ${rem(80)})`}
            mx="-md"
            className={classes.DrwerStyling}>
            <Divider my="sm" />
            <Box className={classes.styleMobile}>
              {Links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`LinkActiveInMain ${classes.link}`}>
                  {link.title}
                </Link>
              ))}
            </Box>
            <Divider my="sm" />
          </ScrollArea>
        </Drawer>
      </Box>
      <div className={classes.Handler}></div>
    </div>
  );
}
