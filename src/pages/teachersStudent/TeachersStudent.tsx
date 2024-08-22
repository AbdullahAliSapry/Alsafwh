import {
  Box,
  Container,
  Grid,
  Pagination,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./TeachersStudent.module.css";
import image from "@assets/Alsafwa/RetratoTwo.png";
import material from "@assets/Alsafwa/Mathematics-bro.png";
import { Link } from "react-router-dom";
import teacher from "@assets/Alsafwa/Retrato Corporativo _ Foto para LinkedIn _ Perfil Profissional _ São Paulo_BR.png";

const color = "rgb(34,166,241)";

export default function TeachersStudent() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const col = () => {
    if (computedColorScheme == "dark") {
      return "white";
    } else {
      return "rgb(34,166,241)";
    }
  };

  return (
    <Box className={classes.parent} mb={50}>
      <Box mb={50} className={classes.headerPageTeacher}>
        <Text my={20} fz={30} c={"#003EDD"}>
          الطلاب{" "}
        </Text>

        <Text my={20} fz={30} c={"white"}>
          هم امل التقدم و مفتاح المستقبل{" "}
        </Text>
      </Box>

      <Container
        px={50}
        py={20}
        className={
          computedColorScheme == "light"
            ? classes.containerLight
            : classes.containerDark
        }
      >
        <Box
          display={"flex"}
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box display={"flex"} style={{ alignItems: "center", gap: "1rem" }}>
            <Box className={classes.containerImage} h={100} w={100}>
              <img src={image} width={"150px"} height={"100%"} alt="" />
            </Box>

            <Box>
              <Text fw={700} fz={18} c={color}>
                احمد كامل
              </Text>
              <Text fz={15} fw={400} mt={8}>
              معلم مادة التاريخ
              </Text>
            </Box>
          </Box>

          <Box
            className={classes.numberOfCourses}
            display={"flex"}
            style={{ alignItems: "center" ,gap:"1rem" }}
          >
            <Text fw={700} fz={18} c={color}>
              مادة الرياضيات
            </Text>
            <Box
              pt={15}
              pb={5}
              px={30}
              display={"grid"}
              style={{
                borderRadius: "15px",
              }}
              bg={"rgba(198, 215, 255, 1)"}
            >
              <Text fz={15} fw={500} c={"black"}>
                الرياضيات عقل الحياة
              </Text>
              <Box ta={"center"}>
                <img src={material} width={"auto"} height={"90px"} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box mt={10} mb={50}>
          <Box mb={40} mt={50} className={classes.header_title}>
            <Text c={col()} fz={20} fw={700}>
              الطلاب
            </Text>
          </Box>
          <Grid gutter={"xl"}>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(219,153,153)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(255,225,166)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(179,205,153)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(172,153,153)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(153,167,203)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(167,153,255)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    طالب{" "}
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(235,255,153)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} mb={4}>
              <div className={classes.card}>
                <Box style={{ borderRadius: "15px" }} bg={"rgb(168,234,206)"}>
                  <img
                    src={teacher}
                    className={classes.card_img_top}
                    alt="Teacher Image"
                  />
                </Box>
                <div className="card-body">
                  <Text
                    fz={14}
                    fw={700}
                    ta={"start"}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_titleLight
                        : classes.card_titleDark
                    }
                  >
                    اسلام ناجي ثابت
                  </Text>
                  <Text
                    fz={14}
                    fw={300}
                    ta={"start"}
                    mt={10}
                    className={
                      computedColorScheme == "light"
                        ? classes.card_textLight
                        : classes.card_textDark
                    }
                  >
                    طالب{" "}
                  </Text>
                </div>
              </div>
            </Grid.Col>
          </Grid>

          <Box mt={50} display={"flex"} style={{ justifyContent: "center" }}>
            <Pagination total={4} siblings={1} defaultValue={1} size={"md"}  boundaries={2}  />
          </Box>
        </Box>

        <Box
          mt={50}
          mb={30}
          ml={30}
          display={"flex"}
          style={{ justifyContent: "end" }}
        >
          <Link to={"/"} className={classes.btnSave}>
            امتحانات
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
