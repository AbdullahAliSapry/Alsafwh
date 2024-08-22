import {
  Box,
  Container,
  Grid,
  Select,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./AllTeacher.module.css";
import { motion } from "framer-motion";
import TitleSection from "@shared/titlesction/TitleSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetAllTeacherApi } from "@store/api/TeacherApi";
import TeacherCard from "./components/TeacherCard";
const backgroundColors = [
  "rgb(255,225,166)",
  "rgb(179,205,153)",
  "rgb(172,153,153)",
  "rgb(153,167,203)",
  "rgb(167,153,255)",
  "rgb(235,255,153)",
  "rgb(168,234,206)",
];
const getRandomColor = () => {
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
};
export default function AllTeacher() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { teachers } = useSelector((state: RootState) => state.Teacher);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (teachers.length > 0) return;
    dispatch(GetAllTeacherApi());
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Box className={classes.headerPageTeacher}>
        <Text my={20} fz={30} c={"#003EDD"}>
          المعليمن{" "}
        </Text>

        <Text my={20} fz={30} c={"white"}>
          هم صناع الاجيال و بناة المستقبل
        </Text>
      </Box>

      <div className={classes.parent}>
        <Container mt={100} mb={50}>
          <Box mb={70} mt={50} className={classes.header_title}>
            <TitleSection title=" جميع المُعلمين" />
            <Box className={classes.select}>
              <label
                htmlFor="subjectSelect"
                className={
                  computedColorScheme == "light"
                    ? classes.card_titleLight
                    : classes.card_titleDark
                }>
                الاختيار بالمادة
              </label>
              <br />
              <Select
                mt={5}
                id="subjectSelect"
                data={["الكل"]}
                defaultValue="الكل"
                allowDeselect={false}
              />
            </Box>
          </Box>
          <Grid gutter={"xl"}>
            {teachers.map((teacher) => (
              <TeacherCard
                teacher={teacher}
                key={teacher.id}
                bg={getRandomColor()}
              />
            ))}
          </Grid>
{/* 
          <Box mt={50} display={"flex"} style={{ justifyContent: "center" }}>
            <Pagination total={5} siblings={1} defaultValue={1} />
          </Box> */}
        </Container>
      </div>
    </motion.div>
  );
}
