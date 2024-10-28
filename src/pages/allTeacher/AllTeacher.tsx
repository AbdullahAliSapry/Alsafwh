import {
  Box,
  Container,
  Grid,
  Text,
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


  const { teachers } = useSelector((state: RootState) => state.Teacher);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (teachers.length > 0) return;
    dispatch(GetAllTeacherApi());
  }, []);
    useEffect(() => {
      window.scrollTo(0, 0);
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

        <Text my={20}  className={classes.Description}>
          هم صناع الاجيال و بناة المستقبل
        </Text>
      </Box>

      <div className={classes.parent}>
        <Container mt={100} mb={50}>
          <Box mb={70} mt={50} className={classes.header_title}>
            <TitleSection title=" جميع المُعلمين" />

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

        </Container>
      </div>
    </motion.div>
  );
}
