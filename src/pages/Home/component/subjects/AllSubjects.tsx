import { Box, Text } from "@mantine/core";
import classes from "../status/Status.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/Store";
import { useEffect } from "react";
import { GetAllSubjectApi } from "@store/api/SubjectApi";

export default function AllSubjects() {
  const dispatch = useDispatch<AppDispatch>();

  const { subjects } = useSelector((state: RootState) => state.Subject);

  useEffect(() => {
    if (subjects.length > 0) return;
    dispatch(GetAllSubjectApi());
  }, []);
  return (
    <div>
      <Box className={classes.cards}>
        <Box className={classes.containerOne}>
          {subjects?.slice(0, 2).map((subject, i) => (
            <Box
              ta={"center"}
              w={"250px"}
              h={"150px"}
              key={subject.id}
              className={
                i == 0 ? classes.styleFirstCard : classes.styleSecondCard
              }>
              <Text>{subject.name}</Text>
              <img
                src={subject.fileUploads.url}
                width={"150px"}
                height={"110px"}
              />
            </Box>
          ))}
        </Box>

        <Box className={classes.containerTwo} mt={-120} mb={120}>
          {subjects?.slice(2, 4).map((subject, i) => (
            <Box
              ta={"center"}
              w={"250px"}
              h={"150px"}
              key={subject.id}
              className={
                i == 0 ? classes.styleThreeCard : classes.styleFourCard
              }>
              <Text>{subject.name}</Text>
              <img
                src={subject.fileUploads.url}
                width={"150px"}
                height={"110px"}
              />
            </Box>
          ))}
        </Box>

        <div className={classes.pointOne}></div>
        <div className={classes.pointTwo}></div>
        <div className={classes.pointThree}></div>
      </Box>
    </div>
  );
}
